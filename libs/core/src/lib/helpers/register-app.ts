import {AppRegistrationOptions} from '../models/app-registration-options';
import {registerEntity} from './register-entity';

export function registerApp<T extends Record<string, any> = Record<string, any>>(
  options: AppRegistrationOptions<T>,
) {
  registerEntity(options);
}
