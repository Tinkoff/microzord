import {ApplicationMock} from '@microzord/core/testing';
import {registerEntity} from './register-entity';
import {loadEntity} from './load-entity';
import {of} from 'rxjs';

describe('loadEntity', () => {
  beforeEach(async () => {
    registerEntity({
      name: 'appMock1',
      load() {
        return ApplicationMock;
      },
    });

    registerEntity({
      name: 'appMock2',
      load: null,
    } as any);

    registerEntity({
      name: 'appMock3',
      load() {
        return of(ApplicationMock);
      },
    });

    registerEntity({
      name: 'appMock4',
      load() {
        return Promise.resolve(ApplicationMock);
      },
    });
  });

  it('should load an entity constructor', async () => {
    expect.assertions(3);

    await loadEntity('appMock1').toPromise();

    expect(await loadEntity('appMock1').toPromise()).toStrictEqual(ApplicationMock);
    expect(await loadEntity('appMock3').toPromise()).toStrictEqual(ApplicationMock);
    expect(await loadEntity('appMock4').toPromise()).toStrictEqual(ApplicationMock);
  });

  it('should throw an error when trying to load an unregistered entity', async () => {
    expect.assertions(1);

    await expect(loadEntity('unregistered').toPromise()).rejects.toEqual(
      `Microzord entity "unregistered" has not been registered. Check the spelling or register an app.`,
    );
  });

  it('should throw an error when options does not have the load function', async () => {
    expect.assertions(1);

    await expect(loadEntity('appMock2').toPromise()).rejects.toEqual(
      `Microzord entity "appMock2" is registered but it has no "load" function. Please, provide it`,
    );
  });
});
