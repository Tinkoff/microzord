import {Application} from '../lib/models/application';
import {Observable, of} from 'rxjs';

export class ApplicationMock extends Application {
  navigate(_url: string, _props?: unknown): Observable<void> {
    return of(undefined);
  }

  send(_msg: string | MessageEvent): Observable<void> {
    return of(undefined);
  }
}
