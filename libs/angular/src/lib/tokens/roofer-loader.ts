import {HttpClient} from '@angular/common/http';
import {inject, InjectionToken} from '@angular/core';

export const ROOFER_LOADER = new InjectionToken<HttpClient>('Roofer HTTPClient', {
  factory: () => inject(HttpClient),
});
