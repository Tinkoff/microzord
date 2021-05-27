import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {AngularInstallationComponent} from './angular-installation.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    RouterModule.forChild(generateRoutes(AngularInstallationComponent)),
  ],
  declarations: [AngularInstallationComponent],
  exports: [AngularInstallationComponent],
})
export class AngularInstallationModule {}
