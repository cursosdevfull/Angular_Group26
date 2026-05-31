import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { UserForm } from './app/user-form/user-form';

bootstrapApplication(UserForm, appConfig)
  .catch((err) => console.error(err));
