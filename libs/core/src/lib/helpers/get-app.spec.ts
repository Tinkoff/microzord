import {ApplicationMock} from '../../__mocks_/application.mock';
import {registerApp} from './register-app';
import {loadAppConstructor} from './load-app-constructor';
import {getApp} from './get-app';

describe('getApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      load() {
        return ApplicationMock;
      },
    });

    await loadAppConstructor('appMock').toPromise();
  });

  it('should return an app constructor', async () => {
    expect.assertions(1);

    const appConstructor = await getApp('appMock').toPromise();

    expect(appConstructor).toStrictEqual(ApplicationMock);
  });
});
