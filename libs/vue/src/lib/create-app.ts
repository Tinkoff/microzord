import {App as VueApp, Component, createApp as createVueApp} from 'vue';
import {
  Application,
  ApplicationConstructor,
  MicrozordLifecycleEvent,
  MicrozordMessageEvent,
} from '@microzord/core';

export function createApp(
  name: string,
  rootComponent: Component,
): ApplicationConstructor {
  class VueApplication extends Application {
    private app!: VueApp<Element>;

    async bootstrap(container: string | Element, props?: Record<string, any>) {
      container =
        typeof container === 'string' ? document.querySelector(container)! : container;

      await super.bootstrap(container, props);

      this.app = createVueApp(rootComponent);

      this.app.mount(container);

      this.emitHook(MicrozordLifecycleEvent.bootstrapped());
    }

    destroy() {
      super.destroy();

      this.app.unmount();
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
    new CustomEvent('microzord:load', {
      detail: {name, appConstructor: VueApplication},
    }),
  );

  return VueApplication;
}
