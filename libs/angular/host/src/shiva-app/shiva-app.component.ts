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
import {Application, bootstrapApp} from '@tinkoff-shiva/core';
import {Observable, of, Subject} from 'rxjs';
import {distinctUntilChanged, shareReplay, switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'shiva-app',
  templateUrl: './shiva-app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShivaAppComponent implements OnDestroy {
  @Output()
  hook = new EventEmitter();

  @Output()
  application = new EventEmitter<Application<any>>();

  private destroy$ = new Subject<string>();
  private name$ = new Subject<string>();

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
    this.name$
      .pipe(
        distinctUntilChanged(),
        switchMap(name =>
          name
            ? bootstrapApp(name, this.elementRef.nativeElement).pipe(
                switchMap(app => {
                  const unsubscribe = app.onHook(event => {
                    ngZone.run(() => this.hook.next(event));
                  });

                  return new Observable<Application<any>>(subscriber => {
                    subscriber.next(app);

                    return () => {
                      unsubscribe();
                      app.destroy();
                      subscriber.unsubscribe();
                    };
                  });
                }),
              )
            : of(null),
        ),
        shareReplay(1),
        takeUntil(this.destroy$),
      )
      .subscribe(app => {
        NgZone.assertNotInAngularZone();

        this.application.next(app);
      });

    this.name = null;
  }

  @Input() set name(appName: string) {
    this.ngZone.runOutsideAngular(() => this.name$.next(appName));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
