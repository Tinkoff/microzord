import {defer, Observable} from 'rxjs';
import {Application} from '../models/application';
import {bootstrapApp} from './bootstrap-app';

// todo: обработать варианты, когда указанных приложений нет
export function replaceApps<T extends Record<string, any> = Record<string, any>>(
  from: Application,
  to: string,
  props?: T,
): Observable<Application<T>> {
  return defer(() => {
    from.destroy();

    return bootstrapApp(to, from.container, props);
  });
}
