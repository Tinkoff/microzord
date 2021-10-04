import {
  enableProdMode,
  ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS,
} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic([
  {
    provide: ALLOW_MULTIPLE_PLATFORMS,
    useValue: true,
  },
])
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
