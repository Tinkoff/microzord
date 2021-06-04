import {RegistrationOptions} from '@microzord/core';
import {InjectionToken} from '@angular/core';

export type AppRegistrationOptions = Omit<RegistrationOptions, 'loadApp'> & {
  assetMap: string;
};

export const MICROZORD_APPS = new InjectionToken<AppRegistrationOptions[][]>(
  'Microzord apps',
);
