import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {getApp} from './get-app';

export function navigateApp(
  appName: string,
  url: string,
  props?: unknown, // todo: изменить тип как только он определится в Application#navigate
): Observable<void> {
  return getApp(appName).pipe(switchMap(app => app.navigate(url, props)));
}
