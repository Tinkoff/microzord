import {ChangeDetectionStrategy, Component} from '@angular/core';

const HOST_CONNECTION = `import {MicrozordHostModule} from '@microzord/angular';

@NgModule({
  imports: [
    MicrozordHostModule.register({
      apps: [
        {
          name: 'my-header',
          assetMap: '/react-header/microzord.json',
        },
        {
          name: 'new-footer',
          assetMap: '/vue-footer/microzord.json',
        },
      ],
    }),
  ],
})
export class AppModule {}`;

const ADDING_MODULE = `import {MicrozordModule} from '@microzord/angular';

@NgModule({
    imports: [
      MicrozordModule,
    ],
})
export class SomeModule {}`;

const ADDING_INTO_TEMPLATE = `<header microzord="react-menu"></header>

<div>Any content</div>

<footer microzord="vue-footer-app" (hook)="onFooterLifecycleEvent($event)"></footer>`;

@Component({
  selector: 'angular-host',
  templateUrl: 'angular-host.template.html',
  styleUrls: ['./angular-host.style.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularHostComponent {
  readonly hostConnection = HOST_CONNECTION;
  readonly addingModule = ADDING_MODULE;
  readonly addingIntoTemplate = ADDING_INTO_TEMPLATE;
}
