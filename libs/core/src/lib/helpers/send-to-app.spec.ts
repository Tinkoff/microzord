import {
  bootstrapApp,
  getApp,
  MessageEvent,
  registerApp,
  sendToApp,
} from '@tinkoff-shiva/core';
import {ApplicationMock} from '../../__mocks_/application.mock';

describe('sendToApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      loadApp() {
        return ApplicationMock;
      },
    });

    await bootstrapApp('appMock', '#').toPromise();
  });

  it('should call the send method', async () => {
    expect.assertions(1);

    const app = await getApp('appMock').toPromise();

    const sendSpy = jest.spyOn(app, 'send');

    await sendToApp('appMock', new MessageEvent()).toPromise();

    expect(sendSpy).toHaveBeenCalledWith(expect.any(MessageEvent));
  });
});
