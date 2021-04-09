import {Inject, ModuleWithProviders, NgModule} from '@angular/core';
import {RooferAppDirective} from './roofer-app/roofer-app.directive';
import {AppRegistrationOptions, ROOFER_APPS} from './tokens/roofer-apps';
import {RegistryService} from './services/registry.service';

export interface RooferHostModuleOptions {
  apps: AppRegistrationOptions[];
}

@NgModule({
  declarations: [RooferAppDirective],
  exports: [RooferAppDirective],
})
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
