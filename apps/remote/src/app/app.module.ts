import {ApplicationRef, DoBootstrap, Inject, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(@Inject('some-token') some: boolean) {
    console.log(some);
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    console.log('bootstrap');
  }
}
