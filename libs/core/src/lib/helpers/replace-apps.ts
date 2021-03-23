import {concat, Observable} from 'rxjs';
import {Application} from '../models/application';
import {last, switchMap} from 'rxjs/operators';
import {getApp} from './get-app';
import {destroyApp} from './destroy-app';
import {bootstrapApp} from './bootstrap-app';

// todo: обработать варианты, когда указанных приложений нет
export function replaceApps<T = void>(
  from: string,
  to: string,
  props?: T,
): Observable<Application<T>> {
  return getApp(from).pipe(
    switchMap(app => {
      return concat(destroyApp(from), bootstrapApp(to, app.container, props)).pipe(
        last<Application<T>>(),
      );
    }),
  );
}
