import {Application} from '../lib/models/application';
import {RooferMessageEvent} from '@roofer/core';

export class ApplicationMock extends Application<any> {
  navigate(_url: string, _props?: unknown): Promise<void> {
    return Promise.resolve(undefined);
  }

  send(_msg: string | RooferMessageEvent): Promise<void> {
    return Promise.resolve(undefined);
  }
}
