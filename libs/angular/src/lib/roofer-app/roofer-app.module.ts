import {NgModule} from '@angular/core';
import {RooferAppDirective} from './roofer-app.directive';

@NgModule({
  declarations: [RooferAppDirective],
  exports: [RooferAppDirective],
})
export class RooferAppModule {}
