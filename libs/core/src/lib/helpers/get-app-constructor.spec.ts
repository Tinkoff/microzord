import {getAppConstructor, loadAppConstructor, registerApp} from '@roofer/core';
import {ApplicationMock} from '../../__mocks_/application.mock';

describe('getAppConstructor', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      loadApp() {
        return ApplicationMock;
      },
    });

    await loadAppConstructor('appMock').toPromise();
  });

  it('should return an app constructor', async () => {
    expect.assertions(1);

    const appConstructor = await getAppConstructor('appMock').toPromise();

    expect(appConstructor).toStrictEqual(ApplicationMock);
  });
});
