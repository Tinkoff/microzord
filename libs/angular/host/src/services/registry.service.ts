import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {LoaderService} from './loader.service';
import {AppRegistrationOptions} from '../tokens/roofer-apps';
import {registerApp} from '@roofer/core';

@Injectable({
  providedIn: 'root',
})
export class RegistryService {
  private document: Document;

  constructor(@Inject(DOCUMENT) document: any, private loader: LoaderService) {
    this.document = document;
  }

  registerApps(apps: AppRegistrationOptions[]) {
    apps.map(app => this.register(app));
  }

  register({name, assetMap, props}: AppRegistrationOptions) {
    registerApp({
      name,
      props,
      loadApp: () => this.loader.loadByAssetsMap(name, assetMap),
    });
  }
}
