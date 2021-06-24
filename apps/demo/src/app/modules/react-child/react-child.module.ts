import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {ReactChildComponent} from './react-child.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    RouterModule.forChild(generateRoutes(ReactChildComponent)),
  ],
  declarations: [ReactChildComponent],
  exports: [ReactChildComponent],
})
export class ReactChildModule {}
