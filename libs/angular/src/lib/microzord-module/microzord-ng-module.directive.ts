import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  NgModuleRef,
  NgZone,
  OnDestroy,
} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {switchMap, takeUntil, tap} from 'rxjs/operators';
import {loadEntity} from '@microzord/core';
import {EntryPoint, MicrozordNgModule} from '../types/ng-module';
import {complete} from '../operators/complete';
import {MicrozordNgCompilerService} from './microzord-ng-compiler.service';

@Directive({
  selector: '[microzordNgModule]',
  providers: [MicrozordNgCompilerService],
})
export class MicrozordNgModuleDirective implements OnDestroy {
  private name$ = new Subject<string | null>();
  private destroy$ = new Subject<void>();

  constructor(
    private ngZone: NgZone,
    private componentFactoryResolver: ComponentFactoryResolver,
    private mzNgCompiler: MicrozordNgCompilerService,
  ) {
    this.name$
      .pipe(
        tap(() => NgZone.assertNotInAngularZone()),
        switchMap(name => (name ? this.loadModuleAndBootstrap(name) : of(null))),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  private loadModuleAndBootstrap(name: string): Observable<unknown> {
    return loadEntity<any, MicrozordNgModule>(name).pipe(
      switchMap(Module => this.mzNgCompiler.createEntryPointFromModule(Module)),
      complete(componentRef => this.destroyComponentAndModule(componentRef)),
    );
  }

  private destroyComponentAndModule<T extends EntryPoint = EntryPoint>(
    componentRef: ComponentRef<T>,
  ) {
    componentRef.destroy();
    componentRef.injector.get(NgModuleRef).destroy();
  }

  @Input('microzordNgModule')
  set name(moduleName: string | null) {
    this.ngZone.runOutsideAngular(() => this.name$.next(moduleName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
