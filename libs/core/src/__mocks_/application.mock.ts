import {Application} from '../lib/models/application';

export class ApplicationMock extends Application {
  navigate(_url: string, _props?: unknown): Promise<void> {
    return Promise.resolve(undefined);
  }

  send(_msg: string | MessageEvent): Promise<void> {
    return Promise.resolve(undefined);
  }
}
