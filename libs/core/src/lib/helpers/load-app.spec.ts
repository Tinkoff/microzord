import {loadApp} from './load-app';
import {registerApp} from './register-app';
import {ApplicationMock} from '../../__mocks_/application.mock';

describe('loadApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock1',
      load() {
        return ApplicationMock;
      },
    });
  });

  it('should load an app constructor', async () => {
    expect.assertions(1);

    await loadApp('appMock1').toPromise();

    expect(await loadApp('appMock1').toPromise()).toStrictEqual(ApplicationMock);
  });
});
