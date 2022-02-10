import {NgModule, Type} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MicrozordNgModule} from '@microzord/angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule implements MicrozordNgModule<AppComponent> {
  getEntryPoint(): Type<AppComponent> {
    return AppComponent;
  }
}
