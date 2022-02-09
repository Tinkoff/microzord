import {entityOptionsRegistry} from '../registry';
import {AppRegistrationOptions} from '../models/app-registration-options';

export function registerApp<T extends Record<string, any> = Record<string, any>>(
  options: AppRegistrationOptions<T>,
) {
  entityOptionsRegistry.set(options.name, options);
}
