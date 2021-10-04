import {Observable} from 'rxjs';
import {ApplicationConstructor} from './application';

export interface RegistrationOptions<
  T extends Record<string, any> = Record<string, any>,
> {
  name: string;
  props?: T;
  loadApp: (
    props: T,
  ) =>
    | Observable<ApplicationConstructor<T>>
    | PromiseLike<ApplicationConstructor<T>>
    | ApplicationConstructor<T>;
}
