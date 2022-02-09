import {Observable, of} from 'rxjs';
import {loadedEntityRegistry} from '../registry';
import {EntityConstructor} from '../models/entity';

export function getEntity<T, K>(
  entityName: string,
): Observable<EntityConstructor<T, K> | null> {
  return of(loadedEntityRegistry.get(entityName) || null);
}
