import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {NativeInstallationComponent} from './native-installation.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    RouterModule.forChild(generateRoutes(NativeInstallationComponent)),
  ],
  declarations: [NativeInstallationComponent],
  exports: [NativeInstallationComponent],
})
export class NativeInstallationModule {}
