import {TestBed} from '@angular/core/testing';

import {MicrozordNgCompilerService} from './microzord-ng-compiler.service';
import {
  Component,
  ComponentFactory,
  Injector,
  NgModule,
  NgModuleRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import {EntryPoint, MicrozordNgModule} from '../types/ng-module';
import {mockProvider} from '@ngneat/spectator';

@Component({template: ''})
class MockComponent implements EntryPoint {}

@NgModule({})
class MockModule implements MicrozordNgModule {
  getEntryPoint(): Type<EntryPoint> {
    return MockComponent;
  }
}

describe('MicrozordNgCompilerService', () => {
  let service: MicrozordNgCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MicrozordNgCompilerService,
        mockProvider(ViewContainerRef, {
          clear: () => undefined,
          createComponent(
            componentFactory: ComponentFactory<any>,
            index: number,
            injector: Injector,
            projectableNodes: any[][],
            ngModule: NgModuleRef<any>,
          ) {
            return componentFactory.create(
              injector,
              projectableNodes,
              undefined,
              ngModule,
            );
          },
        }),
      ],
    });
    service = TestBed.inject(MicrozordNgCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create module', async () => {
    expect.assertions(1);

    const moduleRef = await service.createModule(MockModule);

    expect(moduleRef.instance).toBeInstanceOf(MockModule);
  });

  it('should create a module', async () => {
    expect.assertions(1);

    const moduleRef = await service.createModule(MockModule);

    expect(moduleRef.instance).toBeInstanceOf(MockModule);
  });

  it('should create an entry point', async () => {
    expect.assertions(1);

    const componentRef = await service.createEntryPoint(
      await service.createModule(MockModule),
    );

    expect(componentRef.instance).toBeInstanceOf(MockComponent);
  });

  it('should create an entry point from module', async () => {
    expect.assertions(1);

    const componentRef = await service.createEntryPointFromModule(MockModule);

    expect(componentRef.instance).toBeInstanceOf(MockComponent);
  });
});
