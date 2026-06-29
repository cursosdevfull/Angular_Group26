import { Observable } from 'rxjs';
import { Course } from '../course';
import { RESPONSE } from '@backoffice/core/types/response';

export type PORT_COURSE_ADAPTER = {
  getAll(page: number, limit: number): Observable<RESPONSE>;
  getById(id: number): Observable<RESPONSE>;
  create(course: Course): Observable<RESPONSE>;
  update(course: Course): Observable<RESPONSE>;
  delete(id: number): Observable<RESPONSE>;
};
