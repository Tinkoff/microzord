import {InjectFlags, InjectionToken, NgModuleRef} from '@angular/core';
import {Application, ApplicationConstructor} from '@microzord/core';
import {Router} from '@angular/router';
import {MicrozordLifecycleEvent, MicrozordMessageEvent} from '@microzord/core';

export const APP_NAME = new InjectionToken<string>('App name');
export const ROOT_SELECTOR = new InjectionToken<string>('Root selector');

// todo: очень грубая имплементация
export function createApp<M, Props extends Record<string, any> = Record<string, any>>(
  bootstrapFn: (props?: any) => Promise<NgModuleRef<M>>,
  rootSelector: string,
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

      this.ngModule = await bootstrapFn(props);
      this.router = this.ngModule.injector.get(Router, null, InjectFlags.Optional);

      await super.bootstrap(container, props);

      this.emitHook(MicrozordLifecycleEvent.bootstrapped());
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
