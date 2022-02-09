import {EntityRegistrationOptions} from './models/registration-options';
import {EntityConstructor} from './models/entity';

export class MicrozordRegistry<K, V> {
  private _map = new Map<K, V>();

  getMap(): ReadonlyMap<K, V> {
    return this._map;
  }

  clear(): void {
    this._map.clear();
  }

  get<E extends V = V>(key: K): E | undefined {
    return this._map.get(key) as E;
  }

  set<E extends V = V>(key: K, value: E): void {
    this._map.set(key, value);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const entityOptionsRegistry = new MicrozordRegistry<
  string,
  EntityRegistrationOptions<any>
>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const loadedEntityRegistry = new MicrozordRegistry<
  string,
  EntityConstructor<any, any>
>();
