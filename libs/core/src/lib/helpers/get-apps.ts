import {defer, Observable} from 'rxjs';
import {toArray} from 'rxjs/operators';
import {Application} from '../models/application';
import {bootstrappedAppRegistry} from '../registry';

export function getApps(): Observable<Application[]> {
  return defer(() => bootstrappedAppRegistry.values()).pipe(toArray());
}
