import {registerApp} from '@roofer/core';
import {ApplicationMock} from '../../__mocks_/application.mock';
import {appOptionsRegistry} from '../registry';

describe('registerApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      loadApp() {
        return ApplicationMock;
      },
    });
  });

  it('should register an app', async () => {
    expect.assertions(1);

    expect(appOptionsRegistry.get('appMock')).toEqual({
      name: 'appMock',
      loadApp: expect.any(Function),
    });
  });
});
