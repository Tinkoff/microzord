import {Inject, Injectable} from '@angular/core';
import {ApplicationConstructor} from '@roofer/core';
import {combineLatest, fromEvent, merge, Observable} from 'rxjs';
import {filter, ignoreElements, map, switchMap, take} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';

// @dynamic
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient) {}

  loadByAssetsMap(name: string, assetMapUrl: string): Observable<ApplicationConstructor> {
    return merge(
      this.http.get<string[]>(assetMapUrl).pipe(
        switchMap(assets => {
          return merge(
            combineLatest(
              assets
                .filter(file => file.endsWith('.css'))
                .map(file => this.importCSS(file)),
            ),
            combineLatest(
              assets
                .filter(file => file.endsWith('.js'))
                .map(file => this.importJS(file)),
            ),
          );
        }),
        ignoreElements(),
      ),
      fromEvent(this.document, 'loadApp').pipe(
        map(
          (
            event: CustomEvent<{
              name: string;
              appConstructor: ApplicationConstructor;
            }>,
          ) => event?.detail,
        ),
        filter(data => data?.name === name),
        map(({appConstructor}) => appConstructor),
        take(1),
      ),
    );
  }

  private importJS(src: string): Observable<void> {
    return new Observable<void>(subscriber => {
      const script = this.document.createElement('script');

      script.src = src;

      script.onload = () => {
        subscriber.next();
        subscriber.complete();
      };

      script.onerror = (
        event: Event | string,
        source?: string,
        lineno?: number,
        colno?: number,
        error?: Error,
      ) => {
        subscriber.error(error);
      };

      this.document.head.appendChild(script);

      return () => {
        script.remove();
      };
    });
  }

  private importCSS(src: string): Observable<void> {
    return new Observable<void>(subscriber => {
      const link = this.document.createElement('link');

      link.href = src;
      link.rel = 'stylesheet';

      link.onload = () => {
        subscriber.next();
        subscriber.complete();
      };

      link.onerror = (
        event: Event | string,
        source?: string,
        lineno?: number,
        colno?: number,
        error?: Error,
      ) => {
        subscriber.error(error);
      };

      this.document.head.appendChild(link);

      return () => {
        link.remove();
      };
    });
  }
}
