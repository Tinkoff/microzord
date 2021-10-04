import {Injectable} from '@angular/core';
import {AppRegistrationOptions} from '../tokens/microzord-apps';
import {registerApp} from '@microzord/core';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  registerApps(apps: AppRegistrationOptions[]) {
    apps.map(app => this.register(app));
  }

  register({name, loadApp, props}: AppRegistrationOptions) {
    registerApp({
      name,
      props,
      loadApp,
    });
  }
}
