import {Inject, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {ApplicationConstructor, registerApp, RegistrationOptions} from '@roofer/core';
import {RooferAppDirective} from './roofer-app/roofer-app.directive';
import {combineLatest, fromEvent, merge, Observable} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {filter, ignoreElements, map, switchMap, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export const ROOFER_APPS = new InjectionToken<
  Omit<RegistrationOptions<any>, 'loadApp'>[][]
>('Roofer apps');

export interface RooferHostModuleOptions {
  apps: Omit<RegistrationOptions<any>, 'loadApp'>[];
}

@NgModule({
  declarations: [RooferAppDirective],
  exports: [RooferAppDirective],
})
export class RooferHostModule {
  private document: Document;

  constructor(
    @Inject(ROOFER_APPS) allApps: RegistrationOptions<any>[][],
    @Inject(DOCUMENT) doc: any,
    http: HttpClient,
  ) {
    this.document = doc;

    allApps.forEach(apps =>
      apps
        .map(app => ({
          ...app,
          loadApp: () => {
            return merge(
              http.get<string[]>(app.name + '/roofer.json').pipe(
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
                filter(data => data?.name === app.name),
                map(({appConstructor}) => appConstructor),
                take(1),
              ),
            );
          },
        }))
        .forEach(registerApp),
    );
  }

  // for root injector
  static forRoot({apps}: RooferHostModuleOptions): ModuleWithProviders<RooferHostModule> {
    return {
      ngModule: RooferHostModule,
      providers: [
        {
          provide: ROOFER_APPS,
          useValue: apps,
          multi: true,
        },
      ],
    };
  }

  // for lazy modules
  static forChild({
    apps,
  }: RooferHostModuleOptions): ModuleWithProviders<RooferHostModule> {
    return {
      ngModule: RooferHostModule,
      providers: [
        {
          provide: ROOFER_APPS,
          useValue: apps,
          multi: true,
        },
      ],
    };
  }

  // todo: подумать над самым красивой возможность
  // асинхронной загрузки конфига

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
