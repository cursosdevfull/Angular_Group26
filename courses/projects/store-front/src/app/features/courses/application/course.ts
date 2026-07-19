import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { PORT_COURSE_APPLICATION } from '../domain/ports/course-application';
import { RESPONSE } from '@store-front/core/types/response';
import { PORT_COURSE_ADAPTER } from '../domain/ports/course-adapter';
import { TOKEN_COURSE_ADAPTER } from '../courses.di';
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
}
