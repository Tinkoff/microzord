import {NgModule} from '@angular/core';
import {MicrozordAppDirective} from './microzord-app.directive';

@NgModule({
  declarations: [MicrozordAppDirective],
  exports: [MicrozordAppDirective],
})
export class MicrozordAppModule {}
