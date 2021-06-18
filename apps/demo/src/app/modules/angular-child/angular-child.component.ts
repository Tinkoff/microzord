import {ChangeDetectionStrategy, Component} from '@angular/core';

const REPLACING_PLATFORM = `import {platformMicrozordChild} from '@microzord/angular/child';
import {enableProdMode} from '@microzord/angular/child';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformMicrozordChild('microzord-app-name', 'app-root-tag')
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
`;

@Component({
  selector: 'angular-child',
  templateUrl: 'angular-child.template.html',
  styleUrls: ['./angular-child.style.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularChildComponent {
  readonly replacingPlatform = REPLACING_PLATFORM;
}
