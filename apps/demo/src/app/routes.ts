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
    path: 'asset-map',
    loadChildren: () =>
      import('./modules/asset-map/asset-map.module').then(m => m.AssetMapModule),
    data: {
      title: `What is an asset map`,
    },
  },
  {
    path: 'application',
    loadChildren: () =>
      import('./modules/application/application.module').then(m => m.ApplicationModule),
    data: {
      title: `Application entity`,
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
  {
    path: 'angular-host',
    loadChildren: () =>
      import('./modules/angular-host/angular-host.module').then(m => m.AngularHostModule),
    data: {
      title: `Angular Host`,
    },
  },
  {
    path: 'angular-child',
    loadChildren: () =>
      import('./modules/angular-child/angular-child.module').then(
        m => m.AngularChildModule,
      ),
    data: {
      title: `Angular Child`,
    },
  },
  {path: '**', redirectTo: 'getting-started'},
];
