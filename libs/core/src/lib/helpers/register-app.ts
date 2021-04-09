import {appOptionsRegistry} from '../registry';
import {RegistrationOptions} from '../models/registration-options';

export function registerApp<T extends Record<string, any> = Record<string, any>>(
  options: RegistrationOptions<T>,
) {
  appOptionsRegistry.set(options.name, options);
}
