import {defer, Observable} from 'rxjs';
import {last, map} from 'rxjs/operators';
import {bootstrappedAppRegistry} from '../registry';

export function destroyAllApps(): Observable<void> {
  return defer(() => bootstrappedAppRegistry.values()).pipe(
    map(app => app.destroy()),
    last(),
  );
}
