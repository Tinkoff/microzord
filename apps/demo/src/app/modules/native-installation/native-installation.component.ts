import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'native-installation',
  templateUrl: './native-installation.template.html',
  styleUrls: ['./native-installation.style.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NativeInstallationComponent {}
