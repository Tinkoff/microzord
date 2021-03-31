import {Directive, ElementRef, Input, NgZone, OnDestroy, Output} from '@angular/core';
import {Application, bootstrapApp, ShivaLifecycleEvent} from '@tinkoff-shiva/core';
import {NEVER, Observable, of, Subject} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  finalize,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

@Directive({
  selector: '[shiva-app]',
})
export class ShivaAppDirective implements OnDestroy {
  @Output()
  hook: Observable<ShivaLifecycleEvent>;

  @Output()
  application: Observable<Application<any>>;

  private destroy$ = new Subject<string>();
  private name$ = new Subject<string>();

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {
    this.application = this.name$.pipe(
      distinctUntilChanged(),
      switchMap(name => {
        NgZone.assertNotInAngularZone();

        return name
          ? bootstrapApp(name, this.elementRef.nativeElement).pipe(
              switchMap(app => {
                return NEVER.pipe(
                  startWith(app),
                  finalize(() => {
                    app.destroy();
                  }),
                );
              }),
            )
          : of(null);
      }),
      takeUntil(this.destroy$),
    );

    this.hook = this.application.pipe(
      filter<Application>(Boolean),
      switchMap(
        app =>
          new Observable<ShivaLifecycleEvent>(subscriber => {
            const unsubscribe = app.onHook(event => subscriber.next(event));
            subscriber.add(unsubscribe);
          }),
      ),
    );

    this.application.subscribe();
  }

  @Input() set name(appName: string) {
    this.ngZone.runOutsideAngular(() => this.name$.next(appName));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
