import {Inject, ModuleWithProviders, NgModule, Type} from '@angular/core';
import {AppRegistrationOptions, EntityRegistrationOptions} from '@microzord/core';

import {MICROZORD_APPS, MICROZORD_NG_MODULES} from './tokens/microzord-apps';
import {RegistryService} from './services/registry.service';
import {MicrozordAppModule} from './microzord-app/microzord-app.module';
import {MicrozordNgModuleModule} from './microzord-module/microzord-ng-module.module';
import {NgModuleRegistrationOptions} from './types/ng-module';

export interface MicrozordHostModuleOptions {
  apps?: AppRegistrationOptions[];
  modules?: EntityRegistrationOptions<Type<any>>[];
}

@NgModule({
  exports: [MicrozordAppModule, MicrozordNgModuleModule],
})
export class MicrozordHostModule {
  constructor(
    @Inject(MICROZORD_APPS) allApps: AppRegistrationOptions[][],
    @Inject(MICROZORD_NG_MODULES) allModules: NgModuleRegistrationOptions[][],
    registry: RegistryService,
  ) {
    allApps.forEach(apps => registry.registerMany(apps));
    allModules.forEach(modules => registry.registerMany(modules));
  }

  static register({
    apps,
    modules,
  }: MicrozordHostModuleOptions): ModuleWithProviders<MicrozordHostModule> {
    return {
      ngModule: MicrozordHostModule,
      providers: [
        apps
          ? {
              provide: MICROZORD_APPS,
              useValue: apps,
              multi: true,
            }
          : [],
        modules
          ? {
              provide: MICROZORD_NG_MODULES,
              useValue: modules,
              multi: true,
            }
          : [],
      ],
    };
  }
}
