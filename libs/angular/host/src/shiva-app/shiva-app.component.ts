import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import {bootstrapApp, destroyApp, replaceApps} from '@tinkoff-shiva/core';

/**
 * todo: не забыть все это пустить мимо зоны
 */

@Component({
  selector: 'shiva-app',
  templateUrl: './shiva-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShivaAppComponent implements OnDestroy {
  /**
   * Hooks
   *
   * todo: Lifecycle event single output or bootstrap, destroy, init, etc
   */
  @Output()
  bootstrap = new EventEmitter();

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {}

  private _name: string;

  // имя приложения
  @Input() set name(appName: string) {
    if (this._name === appName) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      if (appName) {
        if (!this._name) {
          bootstrapApp(appName, this.elementRef.nativeElement).subscribe();
        } else {
          replaceApps(this._name, appName).subscribe();
        }
      } else {
        if (this._name) {
          destroyApp(this._name).subscribe();
        }
      }
    });
    this._name = appName;
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this._name) {
      destroyApp(this._name).subscribe();
    }
  }
}
