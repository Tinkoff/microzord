import {defer, Observable} from 'rxjs';
import {map, mapTo, switchMap, tap} from 'rxjs/operators';
import {Application} from '../models/application';
import {appOptionsRegistry} from '../registry';
import {loadAppConstructor} from './load-app-constructor';

export function bootstrapApp<T extends Record<string, any> = Record<string, any>>(
  appName: string,
  selector: string | Element,
  props?: T,
): Observable<Application<T>> {
  return loadAppConstructor<T>(appName).pipe(
    map(
      AppConstructor =>
        new AppConstructor(appName, appOptionsRegistry.get(appName)?.props),
    ),
    tap(console.log),
    switchMap(app => defer(() => app.bootstrap(selector, props)).pipe(mapTo(app))),
  );
}
