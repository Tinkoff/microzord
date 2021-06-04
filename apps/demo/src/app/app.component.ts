import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'microzord-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
