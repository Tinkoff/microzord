import {defer, isObservable, Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {ApplicationConstructor} from '../models/application';
import {entityOptionsRegistry, loadedEntityRegistry} from '../registry';
import {getApp} from './get-app';
import {AppRegistrationOptions} from '../models/app-registration-options';

export function loadAppConstructor<T extends Record<string, any> = Record<string, any>>(
  appName: string,
): Observable<ApplicationConstructor<T>> {
  return getApp<T>(appName).pipe(
    switchMap(appConstructor =>
      appConstructor
        ? of(appConstructor)
        : defer(() => {
            const appOptions =
              entityOptionsRegistry.get<AppRegistrationOptions<T>>(appName);

            if (!appOptions) {
              throw `Microzord appliction "${appName}" has not been registered. Check the spelling or register an app.`;
            }

            if (!appOptions.load) {
              throw `Microzord appliction "${appName}" is registered but it has no "load" function. Please, provide it`;
            }

            const result = appOptions.load();

            return result &&
              (isObservable(result) ||
                ('then' in result && typeof result['then'] === 'function'))
              ? defer(() => result)
              : of(result as ApplicationConstructor<T>);
          }),
    ),
    tap(applicationConstructor =>
      loadedEntityRegistry.set(appName, applicationConstructor),
    ),
  );
}
