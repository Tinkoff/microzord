import {Observable, of} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Application, ApplicationConstructor} from '../models/application';
import {loadedEntityRegistry} from '../registry';
import {getApp} from './get-app';
import {loadEntity} from './load-entity';

export function loadApp<T extends Record<string, any> = Record<string, any>>(
  appName: string,
): Observable<ApplicationConstructor<T>> {
  return getApp<T>(appName).pipe(
    switchMap(appConstructor =>
      appConstructor
        ? of(appConstructor).pipe(
            tap(applicationConstructor =>
              loadedEntityRegistry.set(appName, applicationConstructor),
            ),
          )
        : loadEntity<T, Application<T>>(appName),
    ),
  );
}
