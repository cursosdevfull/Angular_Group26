import { Routes } from '@angular/router';
import { Report01 } from './report01/report01';

export const routes: Routes = [
  {
    path: 'report01',
    //component: Report01,
    loadComponent: () => import('./report01/report01').then((c) => c.Report01),
    data: { title: 'Report 01', description: 'This is the first report', rolesAllowed: ['admin', 'user'] },
  },
  {
    path: 'report02/:startDate/:endDate',
    loadComponent: () => import('./report02/report02').then((c) => c.Report02),
    data: { title: 'Report 02', description: 'This is the second report', rolesAllowed: ['admin', 'support'] },
  },
  {
    path: 'report03',
    loadComponent: () => import('./report03/report03').then((c) => c.Report03),
    data: { title: 'Report 03', description: 'This is the third report', rolesAllowed: ['admin', 'helpdesk'] },
  },
];
