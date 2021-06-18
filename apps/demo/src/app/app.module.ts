import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TuiDocMainModule, TUI_DOC_LOGO, TUI_DOC_PAGES} from '@taiga-ui/addon-doc';
import {TuiLinkModule} from '@taiga-ui/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {LOGO_CONTENT} from './logo/logo.component';
import {pages} from './pages';
import {GettingStartedModule} from './getting-started/getting-started.module';
import {ROUTES} from './routes';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';

export const HIGHLIGHT_OPTIONS_VALUE = {
  coreLibraryLoader: () => import('highlight.js/lib/core' as string),
  lineNumbersLoader: () => import('highlightjs-line-numbers.js' as string),
  languages: {
    typescript: () => import('highlight.js/lib/languages/typescript' as string),
    less: () => import('highlight.js/lib/languages/less' as string),
    xml: () => import('highlight.js/lib/languages/xml' as string),
  },
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiDocMainModule,
    TuiLinkModule,
    GettingStartedModule,
    RouterModule.forRoot(ROUTES, {initialNavigation: 'enabled'}),
  ],
  providers: [
    {
      provide: TUI_DOC_LOGO,
      useValue: LOGO_CONTENT,
    },
    {
      provide: TUI_DOC_PAGES,
      useValue: pages,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: HIGHLIGHT_OPTIONS_VALUE,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
