import {Observable} from 'rxjs';
import {ApplicationConstructor} from './application';

export interface RegistrationOptions<T = void> {
  name: string;
  props?: T;
  loadApp: (
    props: T,
  ) =>
    | Observable<ApplicationConstructor<T>>
    | PromiseLike<ApplicationConstructor<T>>
    | ApplicationConstructor<T>;
}
