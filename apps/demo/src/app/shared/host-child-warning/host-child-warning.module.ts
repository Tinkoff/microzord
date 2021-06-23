import {NgModule} from '@angular/core';
import {TuiNotificationModule} from '@taiga-ui/core';
import {HostChildWarningComponent} from './host-child-warning.component';

@NgModule({
  imports: [TuiNotificationModule],
  declarations: [HostChildWarningComponent],
  exports: [HostChildWarningComponent],
})
export class HostChildWarningModule {}
