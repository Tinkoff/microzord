import {bootstrapApp, destroyApp, getApp, registerApp} from '@tinkoff-shiva/core';
import {ApplicationMock} from '../../__mocks_/application.mock';

describe('destroyApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      loadApp() {
        return ApplicationMock;
      },
    });

    await bootstrapApp('appMock', '#').toPromise();
  });

  it('should destroy an app', async () => {
    expect.assertions(1);

    const app = await getApp('appMock').toPromise();

    await destroyApp('appMock').toPromise();

    expect(app.isDestroyed).toStrictEqual(true);
  });
});
