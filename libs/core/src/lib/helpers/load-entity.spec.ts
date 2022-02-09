import {ApplicationMock} from '../../__mocks_/application.mock';
import {registerEntity} from './register-entity';
import {loadEntity} from './load-entity';

describe('loadEntity', () => {
  beforeEach(async () => {
    registerEntity({
      name: 'appMock1',
      load() {
        return ApplicationMock;
      },
    });
  });

  it('should load an entity constructor', async () => {
    expect.assertions(1);

    await loadEntity('appMock1').toPromise();

    expect(await loadEntity('appMock1').toPromise()).toStrictEqual(ApplicationMock);
  });
});
