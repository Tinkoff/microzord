import {
  Directive,
  ElementRef,
  ErrorHandler,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';
import {Application, bootstrapApp, MicrozordLifecycleEvent} from '@microzord/core';
import {Observable, of, Subject} from 'rxjs';
import {
  catchError,
  filter,
  mergeMap,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {complete} from '../operators/complete';

@Directive({
  selector: '[microzordApp]:not(ng-container)',
})
export class MicrozordAppDirective implements OnDestroy {
  @Output()
  hook: Observable<MicrozordLifecycleEvent>;

  @Output()
  application: Observable<Application | null>;

  private destroy$ = new Subject<void>();
  private name$ = new Subject<string>();

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    private errorHandler: ErrorHandler,
  ) {
    this.application = this.name$.pipe(
      tap(() => NgZone.assertNotInAngularZone()),
      switchMap(name =>
        name
          ? bootstrapApp(name, this.elementRef.nativeElement).pipe(
              complete(app => app.destroy()),
              catchError(error => {
                this.errorHandler.handleError(error);
                return of(null);
              }),
            )
          : of(null),
      ),
      shareReplay(1),
      takeUntil(this.destroy$),
    );

    this.hook = this.application.pipe(
      filter((app => !!app) as (app: unknown) => app is Application),
      switchMap(
        app =>
          new Observable<MicrozordLifecycleEvent>(subscriber =>
            app.onHook(event => subscriber.next(event)),
          ),
      ),
    );

    this.application.subscribe();
  }

  @Input('microzordApp')
  set name(appName: string) {
    this.ngZone.runOutsideAngular(() => this.name$.next(appName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
