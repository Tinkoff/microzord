import {AppRegistrationOptions} from '@microzord/core';
import {InjectionToken} from '@angular/core';

export const MICROZORD_APPS = new InjectionToken<AppRegistrationOptions[][]>(
  'Microzord apps',
);
