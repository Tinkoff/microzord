import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'host-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  moduleName$$ = new BehaviorSubject<string | null>('remote');

  click() {
    if (this.moduleName$$.getValue() === 'remote') {
      this.moduleName$$.next('demo');
    } else {
      this.moduleName$$.next('remote');
    }
  }
}
