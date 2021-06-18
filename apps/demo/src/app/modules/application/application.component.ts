import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'application',
  templateUrl: './application.template.html',
  styleUrls: ['./application.style.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApplicationComponent {}
