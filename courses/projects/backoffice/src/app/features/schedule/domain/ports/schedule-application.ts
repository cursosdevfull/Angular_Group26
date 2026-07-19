import { Signal, WritableSignal } from '@angular/core';
import { RESPONSE } from '@backoffice/core/types/response';
import { Schedule } from '../schedule';

export type PORT_SCHEDULE_APPLICATION = {
  getAll: WritableSignal<{ page: number; limit: number } | null>;
  responseGetAll: Signal<RESPONSE | null>;

  getById: WritableSignal<number | null>;
  responseGetById: Signal<RESPONSE | null>;

  create: WritableSignal<Schedule | null>;
  responseCreate: Signal<RESPONSE | null>;

  update: WritableSignal<Schedule | null>;
  responseUpdate: Signal<RESPONSE | null>;

  delete: WritableSignal<number | null>;
  responseDelete: Signal<RESPONSE | null>;

  getAllCoursesList: WritableSignal<boolean | null>;
  responseGetAllCoursesList: Signal<RESPONSE | null>;
};
