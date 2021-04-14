import {defer, isObservable, Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {ApplicationConstructor} from '../models/application';
import {RegistrationOptions} from '../models/registration-options';
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
              throw `Roofer appliction "${appName}" has not been registered. Check the spelling or register an app.`;
            }

            if (!appOptions.loadApp) {
              throw `Roofer appliction "${appName}" is registered but it has no "loadApp" function. Please, provide it`;
            }

            const result = appOptions.loadApp(appOptions.props);

            if (
              result &&
              (isObservable(result) ||
                ('then' in result && typeof result['then'] === 'function'))
            ) {
              return defer(() => result);
            }

            return of(result as ApplicationConstructor<T>);
          }),
    ),
    tap(applicationConstructor => loadedAppRegistry.set(appName, applicationConstructor)),
  );
}
