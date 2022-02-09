import {ApplicationConstructor} from './models/application';
import {AppRegistrationOptions} from './models/app-registration-options';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appOptionsRegistry = new Map<string, AppRegistrationOptions<any>>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadedAppRegistry = new Map<string, ApplicationConstructor<any>>();
