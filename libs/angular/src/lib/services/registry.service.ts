import {Injectable} from '@angular/core';
import {AppRegistrationOptions, registerApp} from '@microzord/core';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  registerApps(apps: AppRegistrationOptions[]) {
    apps.map(app => this.register(app));
  }

  register({name, load, props}: AppRegistrationOptions) {
    registerApp({
      name,
      props,
      load,
    });
  }
}
