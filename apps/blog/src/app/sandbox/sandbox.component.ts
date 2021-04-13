import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {loadAppConstructor, RooferLifecycleEvent} from '@roofer/core';

@Component({
  selector: 'blog-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'],
})
export class SandboxComponent {
  appName$: Subject<string | null> = new Subject();

  loadApp(appName: string) {
    loadAppConstructor(appName).subscribe();
  }

  call($event: RooferLifecycleEvent) {
    console.log($event);
  }
}
