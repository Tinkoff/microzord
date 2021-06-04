import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {ReactInstallationComponent} from './react-installation.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    RouterModule.forChild(generateRoutes(ReactInstallationComponent)),
  ],
  declarations: [ReactInstallationComponent],
  exports: [ReactInstallationComponent],
})
export class ReactInstallationModule {}
