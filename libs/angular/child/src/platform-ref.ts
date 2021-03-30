import {
  CompilerOptions,
  Inject,
  Injectable,
  InjectFlags,
  InjectionToken,
  Injector,
  NgModuleRef,
  PlatformRef,
  Type,
} from '@angular/core';
import {Application, ApplicationConstructor} from '@tinkoff-shiva/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';

export const APP_NAME = new InjectionToken<string>('App name');
export const ROOT_SELECTOR = new InjectionToken<string>('Root selector');

// todo: очень грубая имплементация
function createAppFactory<M>(
  bootstrapFn: () => Promise<NgModuleRef<M>>,
  rootSelector: string,
  resolve: (value?: NgModuleRef<M> | PromiseLike<NgModuleRef<M>>) => void,
  reject: (reason?: any) => void,
): ApplicationConstructor {
  // todo: не хватает имплементации хуков, сообщений и навигации
  class AngularApp extends Application {
    private router: Router;
    private ngModule: NgModuleRef<M>;

    destroy() {
      super.destroy();

      if (this.ngModule) {
        this.ngModule.destroy();
        this.ngModule = null;
      }
    }

    async bootstrap(container: string | Element, _props?: void): Promise<void> {
      container =
        typeof container === 'string' ? document.querySelector(container) : container;

      const rootElement = document.createElement(rootSelector);

      container.appendChild(rootElement);

      try {
        this.ngModule = await bootstrapFn();
        this.router = this.ngModule.injector.get(Router, null, InjectFlags.Optional);

        await super.bootstrap(container, _props);
        resolve(this.ngModule);
      } catch (e) {
        reject(e);
        throw e;
      }
    }

    async navigate(url: string, props: unknown | undefined): Promise<void> {
      if (this.router) {
        await this.router.navigateByUrl(url);
      }
    }

    async send(msg: string | MessageEvent): Promise<void> {
      //
    }
  }

  return AngularApp;
}

@Injectable()
export class ShivaPlatformRef extends PlatformRef {
  private document: Document;

  constructor(
    @Inject(DOCUMENT) document: any,
    @Inject(APP_NAME) private appName: string,
    @Inject(ROOT_SELECTOR) private rootSelector: string,
    _injector: Injector,
  ) {
    super();
    this.document = document;
    (this as any)._injector = _injector;
  }

  async bootstrapModule<M>(
    moduleType: Type<M>,
    compilerOptions?: CompilerOptions | Array<CompilerOptions>,
  ): Promise<NgModuleRef<M>> {
    const bootstrapFn = () => super.bootstrapModule(moduleType, compilerOptions);

    return new Promise((resolve, reject) => {
      const AppConstructor = createAppFactory(
        bootstrapFn,
        this.rootSelector,
        resolve,
        reject,
      );

      this.document.dispatchEvent(
        new CustomEvent('loadApp', {
          detail: {name: this.appName, appConstructor: AppConstructor},
        }),
      );
    });
  }
}
