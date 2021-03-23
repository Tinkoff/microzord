import {createPlatformFactory, PlatformRef} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {APP_NAME, ROOT_SELECTOR, ShivaPlatformRef} from './platform-ref';

const _platformShivaChild = createPlatformFactory(platformBrowserDynamic, 'shiva-child', [
  {
    provide: PlatformRef,
    useClass: ShivaPlatformRef,
  },
]);

export function platformShivaChild(appName: string, rootSelector: string): PlatformRef {
  return _platformShivaChild([
    {provide: APP_NAME, useValue: appName},
    {provide: ROOT_SELECTOR, useValue: rootSelector},
  ]);
}
