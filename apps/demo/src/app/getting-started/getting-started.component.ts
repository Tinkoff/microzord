import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'getting-started',
  templateUrl: './getting-started.template.html',
  styleUrls: ['./getting-started.style.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedComponent {}
