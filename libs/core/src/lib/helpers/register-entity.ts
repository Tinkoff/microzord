import {entityOptionsRegistry} from '../registry';
import {EntityRegistrationOptions} from '../models/app-registration-options';

export function registerEntity<T>(options: EntityRegistrationOptions<T>) {
  entityOptionsRegistry.set(options.name, options);
}
