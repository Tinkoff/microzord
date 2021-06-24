import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'host-child-warning',
  templateUrl: './host-child-warning.template.html',
  styleUrls: ['./host-child-warning.style.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HostChildWarningComponent {}
