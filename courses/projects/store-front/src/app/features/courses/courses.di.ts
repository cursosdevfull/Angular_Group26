import { InjectionToken, Provider } from '@angular/core';
import { CourseApplication } from './application/course';
import { CourseAdapter } from './infrastructure/course';

export const TOKEN_COURSE_APPLICATION = new InjectionToken('TOKEN_COURSE_APPLICATION');
export const TOKEN_COURSE_ADAPTER = new InjectionToken('TOKEN_COURSE_ADAPTER');

export const provideCourse = (): Provider[] => [
  {
    provide: TOKEN_COURSE_APPLICATION,
    useClass: CourseApplication,
  },
  {
    provide: TOKEN_COURSE_ADAPTER,
    useClass: CourseAdapter,
  },
];
