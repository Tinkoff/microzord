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
import {Application, ApplicationConstructor} from '@microzord/core';
import {Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {MicrozordLifecycleEvent, MicrozordMessageEvent} from '@microzord/core';

export const APP_NAME = new InjectionToken<string>('App name');
export const ROOT_SELECTOR = new InjectionToken<string>('Root selector');

// todo: очень грубая имплементация
export function createApp<M, Props extends Record<string, any> = Record<string, any>>(
  bootstrapFn: (props?: any) => Promise<NgModuleRef<M>>,
  rootSelector: string,
  resolve?: (value: NgModuleRef<M> | PromiseLike<NgModuleRef<M>>) => void,
  reject?: (reason?: any) => void,
): ApplicationConstructor {
  // todo: не хватает имплементации хуков, сообщений и навигации
  class AngularApp<T = Props> extends Application<T> {
    private router: Router | null = null;
    private ngModule: NgModuleRef<M> | null = null;

    destroy() {
      super.destroy();

      if (this.ngModule) {
        this.ngModule.destroy();
        this.ngModule = null;
      }

      this.emitHook(MicrozordLifecycleEvent.destroyed());
    }

    async bootstrap(container: string | Element, props?: T): Promise<void> {
      const containerElement =
        typeof container === 'string' ? document.querySelector(container) : container;

      if (!containerElement) {
        throw new Error(`No container found for ${container}`);
      }

      const rootElement = document.createElement(rootSelector);

      containerElement.appendChild(rootElement);

      try {
        this.ngModule = await bootstrapFn(props);
        this.router = this.ngModule.injector.get(Router, null, InjectFlags.Optional);

        await super.bootstrap(container, props);
        resolve?.(this.ngModule);

        this.emitHook(MicrozordLifecycleEvent.bootstrapped());
      } catch (e) {
        reject?.(e);
        throw e;
      }
    }

    async navigate(url: string, _props: unknown | undefined): Promise<void> {
      if (this.router) {
        await this.router.navigateByUrl(url);
      }
    }

    async send(_msg: string | MicrozordMessageEvent): Promise<void> {
      //
    }
  }

  return AngularApp;
}

// @dynamic
@Injectable()
export class MicrozordPlatformRef extends PlatformRef {
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
      const AppConstructor = createApp(bootstrapFn, this.rootSelector, resolve, reject);

      this.document.dispatchEvent(
        new CustomEvent('loadApp', {
          detail: {name: this.appName, appConstructor: AppConstructor},
        }),
      );
    });
  }
}
