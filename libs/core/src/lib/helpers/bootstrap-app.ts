import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Application} from '../models/application';
import {appOptionsRegistry, bootstrappedAppRegistry} from '../registry';
import {loadAppConstructor} from './load-app-constructor';

export function bootstrapApp<T = void>(
  appName: string,
  selector: string | Element,
  props?: T,
): Observable<Application<T>> {
  return loadAppConstructor<T>(appName).pipe(
    map(
      AppConstructor =>
        new AppConstructor(appName, appOptionsRegistry.get(appName)?.props),
    ),
    tap(app => {
      app.bootstrap(selector, props);
      bootstrappedAppRegistry.set(appName, app);
    }),
  );
}
