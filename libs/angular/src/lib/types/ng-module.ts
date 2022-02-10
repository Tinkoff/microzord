import {Type} from '@angular/core';
import {EntityRegistrationOptions} from '@microzord/core';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EntryPoint {
  //
}

export interface MicrozordNgModule<T extends EntryPoint = EntryPoint> {
  getEntryPoint(): Type<T>;
}

export type NgModuleRegistrationOptions = EntityRegistrationOptions<
  Type<MicrozordNgModule>
>;
