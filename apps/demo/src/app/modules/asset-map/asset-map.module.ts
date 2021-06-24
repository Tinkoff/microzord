import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';
import {HostChildWarningModule} from '../../shared/host-child-warning/host-child-warning.module';
import {AssetMapComponent} from './asset-map.component';

@NgModule({
  imports: [
    TuiLinkModule,
    TuiAddonDocModule,
    HostChildWarningModule,
    RouterModule.forChild(generateRoutes(AssetMapComponent)),
  ],
  declarations: [AssetMapComponent],
  exports: [AssetMapComponent],
})
export class AssetMapModule {}
