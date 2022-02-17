import {registerApp} from './register-app';
import {ApplicationMock} from '@microzord/core/testing';
import {entityOptionsRegistry} from '../registry';

describe('registerEntity', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      load() {
        return ApplicationMock;
      },
    });
  });

  it('should register an app', async () => {
    expect.assertions(1);

    expect(entityOptionsRegistry.get('appMock')).toEqual({
      name: 'appMock',
      load: expect.any(Function),
    });
  });
});
