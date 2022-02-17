import {
  Application,
  ApplicationConstructor,
  MicrozordLifecycleEvent,
  MicrozordMessageEvent,
} from '@microzord/core';
import ReactDOM from 'react-dom';
import React, {ReactElement} from 'react';

export function createApp<P>(
  name: string,
  element: ReactElement<P>,
): ApplicationConstructor {
  class ReactApplication extends Application {
    async bootstrap(container: string | Element, props?: Record<string, any>) {
      container =
        typeof container === 'string' ? document.querySelector(container)! : container;

      await super.bootstrap(container, props);

      ReactDOM.render(element, container, () => {
        this.emitHook(MicrozordLifecycleEvent.bootstrapped());
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
      detail: {name, appConstructor: ReactApplication},
    }),
  );

  return ReactApplication;
}
