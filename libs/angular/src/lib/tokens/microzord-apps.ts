import {AppRegistrationOptions} from '@microzord/core';
import {InjectionToken} from '@angular/core';
import {NgModuleRegistrationOptions} from '../types/ng-module';

export const MICROZORD_APPS = new InjectionToken<AppRegistrationOptions[][]>(
  'Microzord apps',
  {
    factory: () => [],
  },
);

export const MICROZORD_NG_MODULES = new InjectionToken<NgModuleRegistrationOptions[][]>(
  'Microzord Angular modules',
  {
    factory: () => [],
  },
);
