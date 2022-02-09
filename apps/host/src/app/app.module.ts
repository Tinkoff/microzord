import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {MicrozordHostModule, MicrozordModule} from '@microzord/angular';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
    HttpClientModule,
    MicrozordModule,
    // MicrozordHostModule.register({
    //   apps: [
    //     {
    //       name: 'remote',
    //       loadApp: () => import('remote/App').then(m => m.App),
    //     },
    //   ],
    // }),
  ],
  providers: [{provide: 'some-token', useValue: 'true'}],
  bootstrap: [AppComponent],
})
export class AppModule {}
