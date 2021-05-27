import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'getting-started',
  templateUrl: './getting-started.template.html',
  styles: [':host {max-width: 1200px}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GettingStartedComponent {}
