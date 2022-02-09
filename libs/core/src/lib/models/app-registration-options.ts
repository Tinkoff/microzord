import {Observable} from 'rxjs';
import {ApplicationConstructor} from './application';

export interface EntityRegistrationOptions<T> {
  name: string;
  load: () => Observable<T> | PromiseLike<T> | T;
}

export interface AppRegistrationOptions<
  T extends Record<string, any> = Record<string, any>,
> extends EntityRegistrationOptions<ApplicationConstructor<T>> {
  props?: T;
}
