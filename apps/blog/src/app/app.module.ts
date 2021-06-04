import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {MicrozordAppModule, MicrozordHostModule} from '@microzord/angular';
import {HttpClientModule} from '@angular/common/http';
import {RxnodeComponent} from './rxnode/rxnode.component';
import {SsrComponent} from './ssr/ssr.component';
import {MainComponent} from './main/main.component';
import {SandboxComponent} from './sandbox/sandbox.component';
import {ComponentsModule} from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    RxnodeComponent,
    SsrComponent,
    MainComponent,
    SandboxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'ssr',
        component: SsrComponent,
      },
      {
        path: 'rxnode',
        component: RxnodeComponent,
      },
      {
        path: 'sandbox',
        component: SandboxComponent,
      },
    ]),
    MicrozordAppModule,
    MicrozordHostModule.register({
      apps: [
        {
          name: 'ssr-article',
          assetMap: '/ssr-article/microzord.json',
        },
        {
          name: 'rxnode-article',
          assetMap: '/rxnode-article/microzord.json',
        },
      ],
    }),
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
