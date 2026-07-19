import { Observable } from 'rxjs';
import { Schedule } from '../schedule';
import { RESPONSE } from '@backoffice/core/types/response';

export type PORT_SCHEDULE_ADAPTER = {
  getAll(page: number, limit: number): Observable<RESPONSE>;
  getById(id: number): Observable<RESPONSE>;
  create(schedule: Schedule): Observable<RESPONSE>;
  update(schedule: Schedule): Observable<RESPONSE>;
  delete(id: number): Observable<RESPONSE>;
  getAllCoursesList(): Observable<RESPONSE>;
};
