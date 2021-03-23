import {bootstrapApp, registerApp} from '@tinkoff-shiva/core';
import {ApplicationMock} from '../../__mocks_/application.mock';
import {getApps} from './get-apps';

describe('getApps', () => {
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

    registerApp({
      name: 'appMock3',
      loadApp() {
        return ApplicationMock;
      },
    });

    await bootstrapApp('appMock1', '#').toPromise();
    await bootstrapApp('appMock2', '#').toPromise();
  });

  it('should return an app instance', async () => {
    expect.assertions(1);

    const apps = await getApps().toPromise();

    expect(apps).toEqual([expect.any(ApplicationMock), expect.any(ApplicationMock)]);
  });
});
