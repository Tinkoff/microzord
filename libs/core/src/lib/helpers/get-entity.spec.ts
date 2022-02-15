import {ApplicationMock} from '@microzord/core/testing';
import {loadEntity} from './load-entity';
import {registerEntity} from './register-entity';
import {getEntity} from './get-entity';

describe('getEntity', () => {
  beforeEach(async () => {
    registerEntity({
      name: 'appMock',
      load() {
        return ApplicationMock;
      },
    });

    await loadEntity('appMock').toPromise();
  });

  it('should return an app constructor', async () => {
    expect.assertions(1);

    const appConstructor = await getEntity('appMock').toPromise();

    expect(appConstructor).toStrictEqual(ApplicationMock);
  });
});
