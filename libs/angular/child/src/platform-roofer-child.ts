import {createPlatformFactory, PlatformRef} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {APP_NAME, ROOT_SELECTOR, RooferPlatformRef} from './platform-ref';

const _platformRooferChild = createPlatformFactory(
  platformBrowserDynamic,
  'roofer-child',
  [
    {
      provide: PlatformRef,
      useClass: RooferPlatformRef,
    },
  ],
);

export function platformRooferChild(appName: string, rootSelector: string): PlatformRef {
  return _platformRooferChild([
    {provide: APP_NAME, useValue: appName},
    {provide: ROOT_SELECTOR, useValue: rootSelector},
  ]);
}
