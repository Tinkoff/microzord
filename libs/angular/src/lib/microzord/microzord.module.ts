import {NgModule} from '@angular/core';
import {MicrozordDirective} from './microzord.directive';

@NgModule({
  declarations: [MicrozordDirective],
  exports: [MicrozordDirective],
})
export class MicrozordModule {}
