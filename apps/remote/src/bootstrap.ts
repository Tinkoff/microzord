import {enableProdMode} from '@angular/core';
import {environment} from './environments/environment';
import {App} from './app/application';

if (environment.production) {
  enableProdMode();
}

new App('remote').bootstrap(document.body);
