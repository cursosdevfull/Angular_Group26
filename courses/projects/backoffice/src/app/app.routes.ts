import { Routes } from '@angular/router';
import { PageLogin } from './features/auth/ui/pages/page-login/page-login';
import { authenticationGuard } from './core/guards/authentication';

export const routes: Routes = [
  {
    path: '',
    component: PageLogin,
  },
  {
    path: 'modules',
    loadComponent: () => import('./shared/components/layout/layout').then((m) => m.Layout),
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard-routes').then((m) => m.dashboardRoutes),
      },
      {
        path: 'course',
        loadChildren: () => import('./features/course/course-routes').then((m) => m.courseRoutes),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('./features/schedule/schedule-routes').then((m) => m.scheduleRoutes),
      },
      {
        path: 'user',
        loadChildren: () => import('./features/user/user-routes').then((m) => m.userRoutes),
      },
    ],
  },
];
