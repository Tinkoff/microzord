import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {AngularChildComponent} from './angular-child.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    RouterModule.forChild(generateRoutes(AngularChildComponent)),
  ],
  declarations: [AngularChildComponent],
  exports: [AngularChildComponent],
})
export class AngularChildModule {}
