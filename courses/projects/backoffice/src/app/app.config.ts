import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { provideAuth } from './features/auth/auth.di';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { loadingInterceptor } from './core/interceptors/loading';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './core/interceptors/error';
import { provideCourse } from './features/course';
import { provideSchedule } from './features/schedule';
import { tokenInterceptor } from './core/interceptors/token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor, errorInterceptor, tokenInterceptor]),
    ),
    ...provideAuth(),
    ...provideCourse(),
    ...provideSchedule(),
    provideNativeDateAdapter(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline', floatLabel: 'always' },
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-PE',
    },
  ],
};
