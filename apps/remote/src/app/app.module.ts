import {ComponentFactory, ComponentFactoryResolver, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // RouterModule.forRoot([], {initialNavigation: 'enabledBlocking'}),
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  getComponentFactory(): ComponentFactory<AppComponent> {
    return this.componentFactoryResolver.resolveComponentFactory(AppComponent);
  }
}
