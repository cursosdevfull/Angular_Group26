import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { PORT_COURSE_APPLICATION } from '../domain/ports/course-application';
import { RESPONSE } from '@backoffice/core/types';
import { Course } from '../domain';
import { PORT_COURSE_ADAPTER } from '../domain/ports/course-adapter';
import { TOKEN_COURSE_ADAPTER } from '../course.di';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

@Injectable()
export class CourseApplication implements PORT_COURSE_APPLICATION {
  private courseAdapter: PORT_COURSE_ADAPTER = inject<PORT_COURSE_ADAPTER>(TOKEN_COURSE_ADAPTER);

  public getAll: WritableSignal<{ page: number; limit: number } | null> = signal<{
    page: number;
    limit: number;
  } | null>(null);
  private obsGetAll = toObservable<{ page: number; limit: number } | null>(this.getAll).pipe(
    switchMap((params) => {
      if (params) {
        return this.courseAdapter.getAll(params.page, params.limit);
      }
      return of(null);
    }),
  );
  public responseGetAll = toSignal<RESPONSE | null>(this.obsGetAll, { initialValue: null });

  public getById: WritableSignal<number | null> = signal<number | null>(null);
  private obsGetById = toObservable<number | null>(this.getById).pipe(
    switchMap((id) => {
      if (id) {
        return this.courseAdapter.getById(id);
      }
      return of(null);
    }),
  );
  public responseGetById = toSignal<RESPONSE | null>(this.obsGetById, { initialValue: null });

  public create = signal<Course | null>(null);
  private obsCreate = toObservable<Course | null>(this.create).pipe(
    switchMap((course) => {
      if (course) {
        return this.courseAdapter.create(course);
      }
      return of(null);
    }),
  );
  public responseCreate = toSignal<RESPONSE | null>(this.obsCreate, { initialValue: null });

  public update = signal<Course | null>(null);
  private obsUpdate = toObservable<Course | null>(this.update).pipe(
    switchMap((course) => {
      if (course) {
        return this.courseAdapter.update(course);
      }
      return of(null);
    }),
  );
  public responseUpdate = toSignal<RESPONSE | null>(this.obsUpdate, { initialValue: null });

  public delete = signal<number | null>(null);
  private obsDelete = toObservable<number | null>(this.delete).pipe(
    switchMap((id) => {
      if (id) {
        return this.courseAdapter.delete(id);
      }
      return of(null);
    }),
  );
  public responseDelete = toSignal<RESPONSE | null>(this.obsDelete, { initialValue: null });
}
