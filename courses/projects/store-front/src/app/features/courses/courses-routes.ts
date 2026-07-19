import { Routes } from '@angular/router';

export const coursesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/course-list/course-list').then((m) => m.CourseList),
  },
  {
    path: ':id',
    loadComponent: () => import('./ui/course-detail/course-detail').then((m) => m.CourseDetail),
  },
];
