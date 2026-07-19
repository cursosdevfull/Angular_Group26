import { InjectionToken, Provider } from '@angular/core';
import { ScheduleApplication } from './application/schedule';
import { ScheduleAdapter } from './infrastructure/schedule';

export const TOKEN_SCHEDULE_APPLICATION = new InjectionToken('TOKEN_SCHEDULE_APPLICATION');
export const TOKEN_SCHEDULE_ADAPTER = new InjectionToken('TOKEN_SCHEDULE_ADAPTER');

export const provideSchedule = (): Provider[] => [
  {
    provide: TOKEN_SCHEDULE_APPLICATION,
    useClass: ScheduleApplication,
  },
  {
    provide: TOKEN_SCHEDULE_ADAPTER,
    useClass: ScheduleAdapter,
  },
];
