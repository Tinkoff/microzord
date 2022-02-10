import {
  Compiler,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  NgModuleRef,
  Optional,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {EntryPoint, MicrozordNgModule} from '../types/ng-module';

@Injectable()
export class MicrozordNgCompilerService {
  constructor(
    private compiler: Compiler,
    private componentFactoryResolver: ComponentFactoryResolver,
    @Optional()
    private injector: Injector,
    @Optional()
    private viewContainerRef: ViewContainerRef,
  ) {}

  async createModule<
    T extends EntryPoint = EntryPoint,
    M extends MicrozordNgModule<T> = MicrozordNgModule<T>,
  >(Module: Type<M>, injector: Injector = this.injector): Promise<NgModuleRef<M>> {
    const moduleFactory = await this.compiler.compileModuleAsync(Module);
    return moduleFactory.create(injector);
  }

  async createEntryPoint<
    T extends EntryPoint = EntryPoint,
    M extends MicrozordNgModule<T> = MicrozordNgModule<T>,
  >(
    moduleRef: NgModuleRef<M>,
    injector: Injector = this.injector,
    viewContainerRef: ViewContainerRef = this.viewContainerRef,
  ): Promise<ComponentRef<T>> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      moduleRef.instance.getEntryPoint(),
    );

    viewContainerRef.clear();
    return viewContainerRef.createComponent(
      componentFactory,
      undefined,
      injector,
      [],
      moduleRef,
    );
  }

  async createEntryPointFromModule<
    T extends EntryPoint = EntryPoint,
    M extends MicrozordNgModule<T> = MicrozordNgModule<T>,
  >(
    Module: Type<M>,
    injector: Injector = this.injector,
    viewContainerRef: ViewContainerRef = this.viewContainerRef,
  ): Promise<ComponentRef<T>> {
    const moduleRef = await this.createModule(Module, injector);
    return await this.createEntryPoint(moduleRef, injector, viewContainerRef);
  }
}
