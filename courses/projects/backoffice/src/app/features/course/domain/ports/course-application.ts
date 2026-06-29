import { Signal, WritableSignal } from '@angular/core';
import { RESPONSE } from '@backoffice/core/types/response';
import { Course } from '../course';

export type PORT_COURSE_APPLICATION = {
  getAll: WritableSignal<{ page: number; limit: number } | null>;
  responseGetAll: Signal<RESPONSE | null>;

  getById: WritableSignal<number | null>;
  responseGetById: Signal<RESPONSE | null>;

  create: WritableSignal<Course | null>;
  responseCreate: Signal<RESPONSE | null>;

  update: WritableSignal<Course | null>;
  responseUpdate: Signal<RESPONSE | null>;

  delete: WritableSignal<number | null>;
  responseDelete: Signal<RESPONSE | null>;
};
