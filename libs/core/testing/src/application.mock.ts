import {
  Application,
  MicrozordLifecycleEvent,
  MicrozordMessageEvent,
} from '@microzord/core';

export class ApplicationMock extends Application<any> {
  navigate(_url: string, _props?: unknown): Promise<void> {
    return Promise.resolve(undefined);
  }

  send(_msg: string | MicrozordMessageEvent): Promise<void> {
    return Promise.resolve(undefined);
  }
}
