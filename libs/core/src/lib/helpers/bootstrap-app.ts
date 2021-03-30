import {defer, Observable} from 'rxjs';
import {map, mapTo, switchMap, tap} from 'rxjs/operators';
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
    switchMap(app => defer(() => app.bootstrap(selector, props)).pipe(mapTo(app))),
    tap(app => {
      bootstrappedAppRegistry.set(appName, app);
    }),
  );
}
