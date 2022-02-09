import {entityOptionsRegistry} from '../registry';
import {EntityRegistrationOptions} from '../models/registration-options';

export function registerEntity<T>(options: EntityRegistrationOptions<T>) {
  entityOptionsRegistry.set(options.name, options);
}
