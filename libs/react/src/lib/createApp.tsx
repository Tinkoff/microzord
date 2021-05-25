import {Application, RooferLifecycleEvent, RooferMessageEvent} from '@roofer/core';
import ReactDOM from 'react-dom';
import React, {ReactElement} from 'react';

export function createApp<P>(name: string, element: ReactElement<P>) {
  class ReactApplication extends Application {
    async bootstrap(container: string | Element, props?: Record<string, any>) {
      container =
        typeof container === 'string' ? document.querySelector(container)! : container;

      await super.bootstrap(container, props);

      ReactDOM.render(element, container, () => {
        this.emitHook(RooferLifecycleEvent.bootstrapped());
      });
    }

    destroy() {
      super.destroy();

      this.container =
        typeof this.container === 'string'
          ? document.querySelector(this.container)!
          : this.container;

      ReactDOM.unmountComponentAtNode(this.container);
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
      detail: {name, appConstructor: ReactApplication},
    }),
  );
}
