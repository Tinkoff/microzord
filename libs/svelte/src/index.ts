import type {SvelteComponentTyped} from 'svelte';
import {Application, RooferLifecycleEvent, RooferMessageEvent} from '@roofer/core';

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

export function createApp(name: string, app: SvelteComponentConstructor) {
  class SvelteApplication extends Application {
    private app: any;

    async bootstrap(container: string | Element, props?: Record<string, any>) {
      container =
        typeof container === 'string' ? document.querySelector(container)! : container;

      await super.bootstrap(container, props);

      this.app = new app({
        target: container,
      });

      this.emitHook(RooferLifecycleEvent.bootstrapped());
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

      this.emitHook(RooferLifecycleEvent.destroyed());
    }

    async navigate(url: string, props: unknown | undefined): Promise<void> {
      return undefined;
    }

    async send(msg: string | RooferMessageEvent): Promise<void> {
      return undefined;
    }
  }

  document.dispatchEvent(
    new CustomEvent('loadApp', {
      detail: {name, appConstructor: SvelteApplication},
    }),
  );
}
