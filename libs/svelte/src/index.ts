import type {SvelteComponentTyped} from 'svelte';
import {
  Application,
  ApplicationConstructor,
  MicrozordLifecycleEvent,
  MicrozordMessageEvent,
} from '@microzord/core';

export interface SvelteComponentConstructor {
  new (options: {
    target: Element;
    anchor?: Element;
    props?: Record<string, any>;
    context?: Map<any, any>;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
  }): SvelteComponentTyped;
}

export function createApp(
  name: string,
  app: SvelteComponentConstructor,
): ApplicationConstructor {
  class SvelteApplication extends Application {
    private app: any;

    async bootstrap(container: string | Element, props?: Record<string, any>) {
      container =
        typeof container === 'string' ? document.querySelector(container)! : container;

      await super.bootstrap(container, props);

      this.app = new app({
        target: container,
      });

      this.emitHook(MicrozordLifecycleEvent.bootstrapped());
    }

    destroy() {
      super.destroy();

      this.container =
        typeof this.container === 'string'
          ? document.querySelector(this.container)!
          : this.container;

      if (this.app) {
        this.app.$destroy();
      }
      this.container = '';

      this.emitHook(MicrozordLifecycleEvent.destroyed());
    }

    async navigate(url: string, props: unknown | undefined): Promise<void> {
      return undefined;
    }

    async send(msg: string | MicrozordMessageEvent): Promise<void> {
      return undefined;
    }
  }

  document.dispatchEvent(
    new CustomEvent('loadApp', {
      detail: {name, appConstructor: SvelteApplication},
    }),
  );

  return SvelteApplication;
}
