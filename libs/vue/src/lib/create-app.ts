import {App as VueApp, Component, createApp as createVueApp} from 'vue';
import {Application, RooferLifecycleEvent, RooferMessageEvent} from '@roofer/core';

export function createApp(name: string, rootComponent: Component) {
  class VueApplication extends Application {
    private app!: VueApp<Element>;

    async bootstrap(container: string | Element, props?: Record<string, any>) {
      container =
        typeof container === 'string' ? document.querySelector(container)! : container;

      await super.bootstrap(container, props);

      this.app = createVueApp(rootComponent);

      this.app.mount(container);

      this.emitHook(RooferLifecycleEvent.bootstrapped());
    }

    destroy() {
      super.destroy();

      this.app.unmount();
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
      detail: {name, appConstructor: VueApplication},
    }),
  );
}
