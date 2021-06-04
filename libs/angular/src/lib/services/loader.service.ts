import {Inject, Injectable} from '@angular/core';
import {ApplicationConstructor} from '@microzord/core';
import {concat, fromEvent, merge, Observable} from 'rxjs';
import {filter, ignoreElements, map, switchMap, take} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MICROZORD_LOADER} from '../tokens/microzord-loader';

// @dynamic
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(MICROZORD_LOADER) private readonly http: HttpClient,
  ) {}

  loadByAssetsMap(name: string, assetMapUrl: string): Observable<ApplicationConstructor> {
    return merge(
      this.http.get<{groups: string[][]}>(assetMapUrl).pipe(
        switchMap(({groups}) => {
          return concat(
            ...groups.map(assets =>
              merge(
                ...assets
                  .filter(file => file.endsWith('.css'))
                  .map(file => this.importCSS(file)),
                ...assets
                  .filter(file => file.endsWith('.js'))
                  .map(file => this.importJS(file)),
              ),
            ),
          );
        }),
        ignoreElements(),
      ),
      fromEvent<CustomEvent>(this.documentRef, 'loadApp').pipe(
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
      const script = this.documentRef.createElement('script');

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

      this.documentRef.head.appendChild(script);

      return () => {
        script.remove();
      };
    });
  }

  private importCSS(src: string): Observable<void> {
    return new Observable<void>(subscriber => {
      const link = this.documentRef.createElement('link');

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

      this.documentRef.head.appendChild(link);

      return () => {
        link.remove();
      };
    });
  }
}
