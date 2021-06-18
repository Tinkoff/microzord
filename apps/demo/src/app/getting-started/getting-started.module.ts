import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiDocPageModule, TuiDocCodeModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {TuiIslandModule} from '@taiga-ui/kit';
import {GettingStartedComponent} from './getting-started.component';

@NgModule({
  imports: [
    CommonModule,
    TuiDocPageModule,
    TuiLinkModule,
    TuiDocCodeModule,
    RouterModule,
    TuiIslandModule,
  ],
  declarations: [GettingStartedComponent],
  exports: [GettingStartedComponent],
})
export class GettingStartedModule {}
