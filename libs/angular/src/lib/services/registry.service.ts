import {Injectable} from '@angular/core';
import {AppRegistrationOptions, registerEntity} from '@microzord/core';
import {NgModuleRegistrationOptions} from '../types/ng-module';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  registerMany(
    apps: ReadonlyArray<AppRegistrationOptions | NgModuleRegistrationOptions>,
  ) {
    apps.forEach(app => this.register(app));
  }

  register(options: AppRegistrationOptions | NgModuleRegistrationOptions) {
    registerEntity(options);
  }
}
