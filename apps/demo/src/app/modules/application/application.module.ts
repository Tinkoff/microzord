import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule, TuiNotificationModule} from '@taiga-ui/core';
import {ApplicationComponent} from './application.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    TuiNotificationModule,
    RouterModule.forChild(generateRoutes(ApplicationComponent)),
  ],
  declarations: [ApplicationComponent],
  exports: [ApplicationComponent],
})
export class ApplicationModule {}
