import { Signal, WritableSignal } from '@angular/core';
import { RESPONSE } from '@store-front/core/types/response';

export type PORT_COURSE_APPLICATION = {
  getAll: WritableSignal<{ page: number; limit: number } | null>;
  responseGetAll: Signal<RESPONSE | null>;

  getById: WritableSignal<number | null>;
  responseGetById: Signal<RESPONSE | null>;
};
