import {bootstrapApp, getApp, navigateApp, registerApp} from '@tinkoff-shiva/core';
import {ApplicationMock} from '../../__mocks_/application.mock';

describe('navigateApp', () => {
  beforeEach(async () => {
    registerApp({
      name: 'appMock',
      loadApp() {
        return ApplicationMock;
      },
    });

    await bootstrapApp('appMock', '').toPromise();
  });

  it('should call the navigate method', async () => {
    expect.assertions(1);

    const app = await getApp('appMock').toPromise();

    const navigateSpy = jest.spyOn(app, 'navigate');

    await navigateApp('appMock', '/').toPromise();

    expect(navigateSpy).toHaveBeenCalledWith('/', undefined);
  });
});
