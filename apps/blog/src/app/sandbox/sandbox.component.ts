import {Component} from '@angular/core';
import {Subject} from 'rxjs';
import {loadAppConstructor, MicrozordLifecycleEvent} from '@microzord/core';

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

  call($event: MicrozordLifecycleEvent) {
    console.log($event);
  }
}
