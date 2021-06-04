import {platformMicrozordChild} from '@microzord/angular/child';
import {enableProdMode} from '@microzord/angular/child';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformMicrozordChild('ssr-article', 'ssr-root')
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
