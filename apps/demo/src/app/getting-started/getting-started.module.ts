import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TuiDocPageModule, TuiDocCodeModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {TuiIslandModule} from '@taiga-ui/kit';
import {HostChildWarningModule} from '../shared/host-child-warning/host-child-warning.module';
import {GettingStartedComponent} from './getting-started.component';

@NgModule({
  imports: [
    CommonModule,
    TuiDocPageModule,
    TuiLinkModule,
    TuiDocCodeModule,
    RouterModule,
    TuiNotificationModule,
    TuiIslandModule,
    HostChildWarningModule,
  ],
  declarations: [GettingStartedComponent],
  exports: [GettingStartedComponent],
})
export class GettingStartedModule {}
