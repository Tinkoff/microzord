import {NgModule} from '@angular/core';
import {MicrozordNgModuleDirective} from './microzord-ng-module.directive';

@NgModule({
  declarations: [MicrozordNgModuleDirective],
  exports: [MicrozordNgModuleDirective],
})
export class MicrozordNgModuleModule {}
