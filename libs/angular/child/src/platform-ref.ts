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
import {Application, ApplicationConstructor} from '@roofer/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {RooferLifecycleEvent, RooferMessageEvent} from '@roofer/core';

export const APP_NAME = new InjectionToken<string>('App name');
export const ROOT_SELECTOR = new InjectionToken<string>('Root selector');

// todo: очень грубая имплементация
function createAppFactory<M, Props extends Record<string, any> = Record<string, any>>(
  bootstrapFn: () => Promise<NgModuleRef<M>>,
  rootSelector: string,
  resolve: (value?: NgModuleRef<M> | PromiseLike<NgModuleRef<M>>) => void,
  reject: (reason?: any) => void,
): ApplicationConstructor {
  // todo: не хватает имплементации хуков, сообщений и навигации
  class AngularApp<T = Props> extends Application<T> {
    private router: Router;
    private ngModule: NgModuleRef<M>;

    destroy() {
      super.destroy();

      if (this.ngModule) {
        this.ngModule.destroy();
        this.ngModule = null;
      }

      this.emitHook(RooferLifecycleEvent.destroyed());
    }

    async bootstrap(container: string | Element, props?: T): Promise<void> {
      container =
        typeof container === 'string' ? document.querySelector(container) : container;

      const rootElement = document.createElement(rootSelector);

      container.appendChild(rootElement);

      try {
        this.ngModule = await bootstrapFn();
        this.router = this.ngModule.injector.get(Router, null, InjectFlags.Optional);

        await super.bootstrap(container, props);
        resolve(this.ngModule);

        this.emitHook(RooferLifecycleEvent.bootstrapped());
      } catch (e) {
        reject(e);
        throw e;
      }
    }

    async navigate(url: string, _props: unknown | undefined): Promise<void> {
      if (this.router) {
        await this.router.navigateByUrl(url);
      }
    }

    async send(_msg: string | RooferMessageEvent): Promise<void> {
      //
    }
  }

  return AngularApp;
}

// @dynamic
@Injectable()
export class RooferPlatformRef extends PlatformRef {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(APP_NAME) private appName: string,
    @Inject(ROOT_SELECTOR) private rootSelector: string,
    _injector: Injector,
  ) {
    super();
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
