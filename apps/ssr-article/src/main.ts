import {platformRooferChild} from '@roofer/angular/child';
import {enableProdMode} from '@roofer/angular/child';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformRooferChild('ssr-article', 'ssr-root')
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
