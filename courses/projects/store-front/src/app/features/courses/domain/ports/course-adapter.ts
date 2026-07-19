import { Observable } from 'rxjs';
import { Course } from '../course';
import { RESPONSE } from '@store-front/core/types/response';

export type PORT_COURSE_ADAPTER = {
  getAll(page: number, limit: number): Observable<RESPONSE>;
  getById(id: number): Observable<RESPONSE>;
};
