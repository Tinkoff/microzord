import {Observable} from 'rxjs';
import {ApplicationConstructor} from '../models/application';
import {getEntity} from './get-entity';

export function getApp<T extends Record<string, any> = Record<string, any>>(
  appName: string,
): Observable<ApplicationConstructor<T> | null> {
  return getEntity(appName);
}
