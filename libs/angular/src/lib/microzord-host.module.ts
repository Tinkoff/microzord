import {Inject, ModuleWithProviders, NgModule} from '@angular/core';
import {AppRegistrationOptions, MICROZORD_APPS} from './tokens/microzord-apps';
import {RegistryService} from './services/registry.service';

export interface MicrozordHostModuleOptions {
  apps: AppRegistrationOptions[];
}

@NgModule({})
export class MicrozordHostModule {
  constructor(
    @Inject(MICROZORD_APPS) allApps: AppRegistrationOptions[][],
    registry: RegistryService,
  ) {
    allApps.forEach(apps => registry.registerApps(apps));
  }

  static register({
    apps,
  }: MicrozordHostModuleOptions): ModuleWithProviders<MicrozordHostModule> {
    return {
      ngModule: MicrozordHostModule,
      providers: [
        {
          provide: MICROZORD_APPS,
          useValue: apps,
          multi: true,
        },
      ],
    };
  }
}
