import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './app/app';
import { Application } from '@tinkoff-shiva/core';
import { Observable } from 'rxjs';

class ReactApplication extends Application {
  bootstrap(container: string | Element, _props?: void) {
    container =
      typeof container === 'string'
        ? document.querySelector(container)
        : container;

    super.bootstrap(container, _props);

    ReactDOM.render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>,
      container
    );
  }

  destroy() {
    super.destroy();

    this.container =
      typeof this.container === 'string'
        ? document.querySelector(this.container)
        : this.container;

    ReactDOM.unmountComponentAtNode(this.container);
    this.container = null;
  }

  navigate(url: string, props: unknown | undefined): Observable<void> {
    return undefined;
  }

  send(msg: string | MessageEvent): Observable<void> {
    return undefined;
  }
}

document.dispatchEvent(
  new CustomEvent('loadApp', {
    detail: { name: 'rxnode-article', appConstructor: ReactApplication },
  })
);
