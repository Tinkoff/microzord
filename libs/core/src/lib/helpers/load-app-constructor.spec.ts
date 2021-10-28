import {loadAppConstructor} from './load-app-constructor';
import {registerApp} from './register-app';
import {ApplicationMock} from '../../__mocks_/application.mock';

describe('loadAppConstructor', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock1',
      loadApp() {
        return ApplicationMock;
      },
    });
  });

  it('should load an app constructor', async () => {
    expect.assertions(1);

    await loadAppConstructor('appMock1').toPromise();

    expect(await loadAppConstructor('appMock1').toPromise()).toStrictEqual(
      ApplicationMock,
    );
  });
});
