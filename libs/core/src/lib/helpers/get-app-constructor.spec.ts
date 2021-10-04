import {ApplicationMock} from '../../__mocks_/application.mock';
import {registerApp} from './register-app';
import {loadAppConstructor} from './load-app-constructor';
import {getAppConstructor} from './get-app-constructor';

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
