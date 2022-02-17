import {entityOptionsRegistry} from '../registry';
import {EntityRegistrationOptions} from '../models/registration-options';

export function registerEntity<
  T,
  K extends EntityRegistrationOptions<T> = EntityRegistrationOptions<T>,
>(options: K): void {
  entityOptionsRegistry.set(options.name, options);
}
