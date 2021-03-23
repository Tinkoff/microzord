import {MessageEvent} from '../models/events';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {getApp} from './get-app';

export function sendToApp(appName: string, msg: MessageEvent): Observable<void> {
  return getApp(appName).pipe(switchMap(app => app.send(msg)));
}
