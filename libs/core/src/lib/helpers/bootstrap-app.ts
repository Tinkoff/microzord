import {defer, Observable} from 'rxjs';
import {map, mapTo, switchMap} from 'rxjs/operators';
import {Application} from '../models/application';
import {entityOptionsRegistry} from '../registry';
import {loadApp} from './load-app';
import {AppRegistrationOptions} from '../models/registration-options';

export function bootstrapApp<T extends Record<string, any> = Record<string, any>>(
  appName: string,
  selector: string | Element,
  props?: T,
): Observable<Application<T>> {
  return loadApp<T>(appName).pipe(
    map(
      AppConstructor =>
        new AppConstructor(
          appName,
          entityOptionsRegistry.get<AppRegistrationOptions<T>>(appName)?.props,
        ),
    ),
    switchMap(app => defer(() => app.bootstrap(selector, props)).pipe(mapTo(app))),
  );
}
