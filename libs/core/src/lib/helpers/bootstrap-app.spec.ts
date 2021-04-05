import {registerApp} from './register-app';
import {
  Application,
  bootstrapApp,
  loadAppConstructor,
  RegistrationOptions,
} from '@roofer/core';
import {appOptionsRegistry, loadedAppRegistry} from '../registry';
import {ApplicationMock} from '../../__mocks_/application.mock';

function clearRegistry() {
  loadedAppRegistry.clear();
  appOptionsRegistry.clear();
}

describe('bootstrapApp', () => {
  let options: RegistrationOptions;
  let loadFn: jest.SpiedFunction<RegistrationOptions['loadApp']>;

  beforeEach(async () => {
    options = {
      name: 'appMock',
      loadApp() {
        return ApplicationMock;
      },
    };

    loadFn = jest.spyOn(options, 'loadApp');

    registerApp(options);
  });

  describe('An app is already loaded', () => {
    beforeEach(async () => {
      await loadAppConstructor('appMock').toPromise();
    });

    it("shouldn't load an app again", async () => {
      expect.assertions(1);

      await bootstrapApp('appMock', '#container').toPromise();

      expect(loadFn).toHaveBeenCalledTimes(1);
    });

    it('should bootstrap an app', async () => {
      expect.assertions(1);

      const app = await bootstrapApp('appMock', '#container').toPromise();

      expect(app).toBeInstanceOf(ApplicationMock);
    });
  });

  describe('An app is NOT loaded', () => {
    it('should load an app', async () => {
      expect.assertions(1);

      await bootstrapApp('appMock', '#container').toPromise();

      expect(loadFn).toHaveBeenCalledTimes(1);
    });

    it('should bootstrap an app', async () => {
      expect.assertions(1);

      const app = await bootstrapApp('appMock', '#container').toPromise();

      expect(app).toBeInstanceOf(Application);
    });
  });

  afterEach(() => {
    clearRegistry();
  });
});
