import {MicrozordAppDirective} from './microzord-app.directive';
import {createDirectiveFactory, SpectatorDirective} from '@ngneat/spectator';
import {first} from 'rxjs/operators';
import {Application, MicrozordLifecycleEvent} from '@microzord/core';
import {MicrozordHostModule} from '@microzord/angular';
import {ApplicationMock} from '@microzord/core/testing';

describe('MicrozordAppDirective', () => {
  let spectator: SpectatorDirective<MicrozordAppDirective, {name: string}>;
  const createDirective = createDirectiveFactory({
    directive: MicrozordAppDirective,
    imports: [
      MicrozordHostModule.register({
        apps: [
          {
            name: 'name',
            load: () => ApplicationMock,
          },
        ],
      }),
    ],
  });

  beforeEach(async () => {
    spectator = createDirective(`<div [microzordApp]='name'></div>`, {
      hostProps: {
        name: 'name',
      },
    });
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });

  it('should emit an application', async () => {
    expect.assertions(1);

    expect(
      await spectator.directive.application.pipe(first()).toPromise(),
    ).toBeInstanceOf(Application);
  });

  it('should emit an event', async () => {
    expect.assertions(1);

    const event$ = spectator.directive.hook.pipe(first()).toPromise();
    spectator.setHostInput('name', 'sss');

    const event = MicrozordLifecycleEvent.destroyed();
    event.target = expect.any(Application);

    expect(await event$).toEqual(event);
  });
});
