import {bootstrapApp, getApp, registerApp, replaceApps} from '@tinkoff-shiva/core';
import {ApplicationMock} from '../../__mocks_/application.mock';

describe('replaceApps', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock1',
      loadApp() {
        return ApplicationMock;
      },
    });

    registerApp({
      name: 'appMock2',
      loadApp() {
        return ApplicationMock;
      },
    });

    await bootstrapApp('appMock1', '#').toPromise();
  });

  it('should destroy the appMock1 app', async () => {
    expect.assertions(1);

    const app1 = await getApp('appMock1').toPromise();

    await replaceApps('appMock1', 'appMock2').toPromise();

    expect(app1.isDestroyed).toStrictEqual(true);
  });

  it('should bootstrap the appMock2 app', async () => {
    expect.assertions(1);

    await replaceApps('appMock1', 'appMock2').toPromise();

    const app2 = await getApp('appMock2').toPromise();

    expect(app2.isBootstrapped).toStrictEqual(true);
  });
});
