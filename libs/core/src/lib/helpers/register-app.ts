import {appOptionsRegistry} from '../registry';
import {RegistrationOptions} from '../models/registration-options';

export function registerApp<T = void>(options: RegistrationOptions<T>) {
  appOptionsRegistry.set(options.name, options);
}
