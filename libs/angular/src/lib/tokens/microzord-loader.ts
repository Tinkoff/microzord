import {HttpClient} from '@angular/common/http';
import {inject, InjectionToken} from '@angular/core';

export const MICROZORD_LOADER = new InjectionToken<HttpClient>('Microzord HTTPClient', {
  factory: () => inject(HttpClient),
});
