import {appOptionsRegistry} from '../registry';
import {AppRegistrationOptions} from '../models/app-registration-options';

export function registerApp<T extends Record<string, any> = Record<string, any>>(
  options: AppRegistrationOptions<T>,
) {
  appOptionsRegistry.set(options.name, options);
}
