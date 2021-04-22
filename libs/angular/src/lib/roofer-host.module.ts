import {Inject, ModuleWithProviders, NgModule} from '@angular/core';
import {AppRegistrationOptions, ROOFER_APPS} from './tokens/roofer-apps';
import {RegistryService} from './services/registry.service';

export interface RooferHostModuleOptions {
  apps: AppRegistrationOptions[];
}

@NgModule({})
export class RooferHostModule {
  constructor(
    @Inject(ROOFER_APPS) allApps: AppRegistrationOptions[][],
    registry: RegistryService,
  ) {
    allApps.forEach(apps => registry.registerApps(apps));
  }

  static register({
    apps,
  }: RooferHostModuleOptions): ModuleWithProviders<RooferHostModule> {
    return {
      ngModule: RooferHostModule,
      providers: [
        {
          provide: ROOFER_APPS,
          useValue: apps,
          multi: true,
        },
      ],
    };
  }
}
