import {Observable, of} from 'rxjs';
import {Application} from '../models/application';
import {bootstrappedAppRegistry} from '../registry';

export function getApp<T = void>(appName: string): Observable<Application<T> | null> {
  return of(bootstrappedAppRegistry.get(appName) || null);
}
