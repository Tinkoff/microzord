import {platformShivaChild} from '@tinkoff-shiva/angular/child';
import {enableProdMode} from '@tinkoff-shiva/angular';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformShivaChild('ssr-article', 'shiva-root')
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
