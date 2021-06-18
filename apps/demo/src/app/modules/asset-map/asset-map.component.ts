import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'asset-map',
  templateUrl: 'asset-map.template.html',
  styleUrls: ['./asset-map.style.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetMapComponent {}
