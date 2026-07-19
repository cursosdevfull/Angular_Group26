import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { PORT_SCHEDULE_APPLICATION } from '../domain/ports/schedule-application';
import { RESPONSE } from '@backoffice/core/types';
import { Schedule } from '../domain';
import { PORT_SCHEDULE_ADAPTER } from '../domain/ports/schedule-adapter';
import { TOKEN_SCHEDULE_ADAPTER } from '../schedule.di';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

@Injectable()
export class ScheduleApplication implements PORT_SCHEDULE_APPLICATION {
  private scheduleAdapter: PORT_SCHEDULE_ADAPTER =
    inject<PORT_SCHEDULE_ADAPTER>(TOKEN_SCHEDULE_ADAPTER);

  public getAll: WritableSignal<{ page: number; limit: number } | null> = signal<{
    page: number;
    limit: number;
  } | null>(null);
  private obsGetAll = toObservable<{ page: number; limit: number } | null>(this.getAll).pipe(
    switchMap((params) => {
      if (params) {
        return this.scheduleAdapter.getAll(params.page, params.limit);
      }
      return of(null);
    }),
  );
  public responseGetAll = toSignal<RESPONSE | null>(this.obsGetAll, { initialValue: null });

  public getById: WritableSignal<number | null> = signal<number | null>(null);
  private obsGetById = toObservable<number | null>(this.getById).pipe(
    switchMap((id) => {
      if (id) {
        return this.scheduleAdapter.getById(id);
      }
      return of(null);
    }),
  );
  public responseGetById = toSignal<RESPONSE | null>(this.obsGetById, { initialValue: null });

  public create = signal<Schedule | null>(null);
  private obsCreate = toObservable<Schedule | null>(this.create).pipe(
    switchMap((schedule) => {
      if (schedule) {
        return this.scheduleAdapter.create(schedule);
      }
      return of(null);
    }),
  );
  public responseCreate = toSignal<RESPONSE | null>(this.obsCreate, { initialValue: null });

  public update = signal<Schedule | null>(null);
  private obsUpdate = toObservable<Schedule | null>(this.update).pipe(
    switchMap((schedule) => {
      if (schedule) {
        return this.scheduleAdapter.update(schedule);
      }
      return of(null);
    }),
  );
  public responseUpdate = toSignal<RESPONSE | null>(this.obsUpdate, { initialValue: null });

  public delete = signal<number | null>(null);
  private obsDelete = toObservable<number | null>(this.delete).pipe(
    switchMap((id) => {
      if (id) {
        return this.scheduleAdapter.delete(id);
      }
      return of(null);
    }),
  );
  public responseDelete = toSignal<RESPONSE | null>(this.obsDelete, { initialValue: null });

  public getAllCoursesList: WritableSignal<boolean | null> = signal<boolean | null>(null);
  private obsGetAllCoursesList = toObservable<boolean | null>(this.getAllCoursesList).pipe(
    switchMap((trigger) => {
      if (trigger) {
        return this.scheduleAdapter.getAllCoursesList();
      }
      return of(null);
    }),
  );
  public responseGetAllCoursesList = toSignal<RESPONSE | null>(this.obsGetAllCoursesList, {
    initialValue: null,
  });
}
