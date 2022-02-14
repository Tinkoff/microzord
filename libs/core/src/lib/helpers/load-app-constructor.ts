import {defer, isObservable, Observable, of} from 'rxjs';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {ApplicationConstructor} from '../models/application';
import {appOptionsRegistry, loadedAppRegistry} from '../registry';
import {getAppConstructor} from './get-app-constructor';

export function loadAppConstructor<T extends Record<string, any> = Record<string, any>>(
  appName: string,
): Observable<ApplicationConstructor<T>> {
  return getAppConstructor<T>(appName).pipe(
    switchMap(appConstructor =>
      appConstructor
        ? of(appConstructor)
        : defer(() => {
            const appOptions = appOptionsRegistry.get(appName);

            if (!appOptions) {
              throw `Microzord appliction "${appName}" has not been registered. Check the spelling or register an app.`;
            }

            if (!appOptions.loadApp) {
              throw `Microzord appliction "${appName}" is registered but it has no "loadApp" function. Please, provide it`;
            }

            const result = appOptions.loadApp(appOptions.props);

            return result &&
              (isObservable(result) ||
                ('then' in result && typeof result['then'] === 'function'))
              ? defer(() => result)
              : of(result as ApplicationConstructor<T>);
          }),
    ),
    tap(applicationConstructor => loadedAppRegistry.set(appName, applicationConstructor)),
  );
}