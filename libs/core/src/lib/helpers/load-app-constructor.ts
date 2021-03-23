import {defer, isObservable, Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {ApplicationConstructor} from '../models/application';
import {RegistrationOptions} from '../models/registration-options';
import {appOptionsRegistry, loadedAppRegistry} from '../registry';
import {getAppConstructor} from './get-app-constructor';

// todo: подумать над ошибками, если в опциях нет функции загрузки
// или приложение вообще не зарегистрированно
export function loadAppConstructor<T = void>(
  appName: string,
): Observable<ApplicationConstructor<T>> {
  return getAppConstructor<T>(appName).pipe(
    switchMap(appConstructor =>
      appConstructor
        ? of(appConstructor)
        : defer(() => {
            const appOptions: RegistrationOptions<T> = appOptionsRegistry.get(appName);

            const result = appOptions.loadApp(appOptions.props);

            if (
              result &&
              (isObservable(result) || typeof result['then'] === 'function')
            ) {
              return defer(() => result);
            }

            return of(result as ApplicationConstructor<T>);
          }),
    ),
    tap(applicationConstructor => loadedAppRegistry.set(appName, applicationConstructor)),
  );
}
