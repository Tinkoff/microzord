import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {loadAppConstructor, ShivaLifecycleEvent} from '@tinkoff-shiva/core';

@Component({
  selector: 'tinkoff-shiva-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'],
})
export class SandboxComponent {
  appName$: Subject<string> = new Subject();

  loadApp(appName: string) {
    loadAppConstructor(appName).subscribe();
  }

  call($event: ShivaLifecycleEvent) {
    console.log($event);
  }
}
