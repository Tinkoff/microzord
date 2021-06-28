import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'react-child',
  templateUrl: './react-child.template.html',
  styleUrls: ['./react-child.style.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactChildComponent {}
