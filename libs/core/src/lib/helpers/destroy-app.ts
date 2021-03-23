import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {bootstrappedAppRegistry} from '../registry';
import {getApp} from './get-app';

export function destroyApp(appName: string): Observable<void> {
  return getApp(appName).pipe(
    map(app => {
      app.destroy();
      bootstrappedAppRegistry.delete(app.name);
    }),
  );
}
