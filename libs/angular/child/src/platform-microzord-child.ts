import {createPlatformFactory, PlatformRef} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {APP_NAME, ROOT_SELECTOR, MicrozordPlatformRef} from './platform-ref';

const _platformMicrozordChild = createPlatformFactory(
  platformBrowserDynamic,
  'microzord-child',
  [
    {
      provide: PlatformRef,
      useClass: MicrozordPlatformRef,
    },
  ],
);

export function platformMicrozordChild(
  appName: string,
  rootSelector: string,
): PlatformRef {
  return _platformMicrozordChild([
    {provide: APP_NAME, useValue: appName},
    {provide: ROOT_SELECTOR, useValue: rootSelector},
  ]);
}
