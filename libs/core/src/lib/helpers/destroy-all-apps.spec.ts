import {bootstrapApp, destroyAllApps, getApp, registerApp} from '@tinkoff-shiva/core';
import {ApplicationMock} from '../../__mocks_/application.mock';
import {concat} from 'rxjs';

describe('destroyAllApps', () => {
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

    await concat(
      bootstrapApp('appMock1', '#'),
      bootstrapApp('appMock2', '#'),
    ).toPromise();
  });

  it('should destroy all apps', async () => {
    expect.assertions(1);

    const app1 = await getApp('appMock1').toPromise();
    const app2 = await getApp('appMock2').toPromise();

    await destroyAllApps().toPromise();

    expect([app1.isDestroyed, app2.isDestroyed]).toStrictEqual([true, true]);
  });
});
