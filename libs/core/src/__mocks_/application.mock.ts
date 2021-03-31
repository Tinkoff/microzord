import {Application} from '../lib/models/application';
import {ShivaMessageEvent} from '@tinkoff-shiva/core';

export class ApplicationMock extends Application<any> {
  navigate(_url: string, _props?: unknown): Promise<void> {
    return Promise.resolve(undefined);
  }

  send(_msg: string | ShivaMessageEvent): Promise<void> {
    return Promise.resolve(undefined);
  }
}
