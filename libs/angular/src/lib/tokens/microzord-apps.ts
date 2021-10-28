import {RegistrationOptions} from '@microzord/core';
import {InjectionToken} from '@angular/core';

export type AppRegistrationOptions = RegistrationOptions;

export const MICROZORD_APPS = new InjectionToken<AppRegistrationOptions[][]>(
  'Microzord apps',
);
