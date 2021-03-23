import {Application, ApplicationConstructor} from './models/application';
import {RegistrationOptions} from './models/registration-options';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appOptionsRegistry = new Map<string, RegistrationOptions<any>>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadedAppRegistry = new Map<string, ApplicationConstructor<any>>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bootstrappedAppRegistry = new Map<string, Application<any>>();
