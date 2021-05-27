import {Route} from '@angular/router';
import {GettingStartedComponent} from './getting-started/getting-started.component';

export const ROUTES: Route[] = [
  {
    path: 'getting-started',
    component: GettingStartedComponent,
    data: {
      title: `Getting started`,
    },
  },
  {
    path: 'react-installation',
    loadChildren: () =>
      import('./modules/react-installation/react-installation.module').then(
        m => m.ReactInstallationModule,
      ),
    data: {
      title: `React Installation`,
    },
  },
  {
    path: 'angular-installation',
    loadChildren: () =>
      import('./modules/angular-installation/angular-installation.module').then(
        m => m.AngularInstallationModule,
      ),
    data: {
      title: `Angular Installation`,
    },
  },
  {path: '**', redirectTo: 'getting-started'},
];
