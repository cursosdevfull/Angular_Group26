import { ApplicationConfig, provideBrowserGlobalErrorListeners, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';
import { InjectionToken } from '@angular/core';

import { routes } from './app.routes';

export class MyConfig {
}

export const myConnectionSlack = new InjectionToken('MyConnectionSlack');

export class ImplementationConfig {
  randomNumber = Math.floor(Math.random() * 1000 + 100);

  getRandomNumber(): number {
    return this.randomNumber;
  }
}

const listProviders: Provider[] = []

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: MyConfig,
      useClass: ImplementationConfig
    },
    {
      provide: "MyConfigString",
      useClass: ImplementationConfig
    },
    ImplementationConfig,
    {
      provide: "SLACK_CHANNEL",
      useValue: "angular-group-26"
    },
    {
      provide: myConnectionSlack,
      //useValue: "https://slack.com/app_redirect?channel=angular-group-26"
      useFactory: (channel: string, config: ImplementationConfig) => {
        return `https://slack.com/app_redirect?channel=${channel}&random=${config.getRandomNumber()}`;
      },
      deps: ["SLACK_CHANNEL", MyConfig]
    }
    /* {
      provide: ImplementationConfig,
      useClass: ImplementationConfig
    } */
  ]
};
