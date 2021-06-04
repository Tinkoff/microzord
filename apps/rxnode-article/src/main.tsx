import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom';

import App from './app/app';
import {
  Application,
  MicrozordLifecycleEvent,
  MicrozordMessageEvent,
} from '@microzord/core';

class ReactApplication extends Application {
  async bootstrap(container: string | Element, props?: Record<string, any>) {
    container =
      typeof container === 'string' ? document.querySelector(container)! : container;

    await super.bootstrap(container, props);

    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
      container,
      () => {
        this.emitHook(MicrozordLifecycleEvent.bootstrapped());
      },
    );
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
  new CustomEvent('loadApp', {
    detail: {name: 'rxnode-article', appConstructor: ReactApplication},
  }),
);
