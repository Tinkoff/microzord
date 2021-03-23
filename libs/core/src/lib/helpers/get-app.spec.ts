import {bootstrapApp, getApp, registerApp} from '@tinkoff-shiva/core';
import {ApplicationMock} from '../../__mocks_/application.mock';

describe('getApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      loadApp() {
        return ApplicationMock;
      },
    });

    await bootstrapApp('appMock', '#').toPromise();
  });

  it('should return an app instance', async () => {
    expect.assertions(1);

    const app = await getApp('appMock').toPromise();

    expect(app).toBeInstanceOf(ApplicationMock);
  });
});
