import {
  AfterViewInit,
  Compiler,
  Component,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'host-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements AfterViewInit {
  title = 'host';

  constructor(private compiler: Compiler, private injector: Injector) {}

  @ViewChild('container', {read: ViewContainerRef})
  formComponent!: ViewContainerRef;

  async ngAfterViewInit(): Promise<void> {
    const App = await import('remote/App').then(m => m.App);

    const moduleFactory = await this.compiler.compileModuleAsync<any>(App);
    const moduleRef = moduleFactory.create(this.injector);
    const componentFactory = moduleRef.instance.getComponentFactory();
    this.formComponent.clear();
    this.formComponent.createComponent(
      componentFactory,
      undefined,
      this.injector,
      undefined,
      // moduleRef,
    );
  }
}
