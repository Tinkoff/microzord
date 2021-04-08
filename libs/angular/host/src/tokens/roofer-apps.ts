import {RegistrationOptions} from '@roofer/core';
import {InjectionToken} from '@angular/core';

export type AppRegistrationOptions = Omit<RegistrationOptions<any>, 'loadApp'> & {
  assetMap: string;
};

export const ROOFER_APPS = new InjectionToken<AppRegistrationOptions[][]>('Roofer apps');
