import { HttpClient } from '@angular/common/http';
import { PORT_SCHEDULE_ADAPTER } from '../domain/ports/schedule-adapter';
import { inject } from '@angular/core/primitives/di';
import { environment } from '../../../../environments/environment.development';
import { RESPONSE } from '@backoffice/core/types/response';
import { Observable } from 'rxjs';
import { Schedule } from '../domain';

export class ScheduleAdapter implements PORT_SCHEDULE_ADAPTER {
  http = inject(HttpClient);

  getAll(page: number, limit: number) {
    return this.http.get<RESPONSE>(
      `${environment.apiUrl}/api/schedules?page=${page}&limit=${limit}`,
    );
  }
  getById(id: number): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(`${environment.apiUrl}/api/schedules/${id}`);
  }
  create(schedule: Schedule): Observable<RESPONSE> {
    return this.http.post<RESPONSE>(`${environment.apiUrl}/api/schedules`, schedule);
  }
  update(schedule: Schedule): Observable<RESPONSE> {
    return this.http.put<RESPONSE>(
      `${environment.apiUrl}/api/schedules/${schedule.properties.id}`,
      schedule,
    );
  }
  delete(id: number): Observable<RESPONSE> {
    return this.http.delete<RESPONSE>(`${environment.apiUrl}/api/schedules/${id}`);
  }
  getAllCoursesList(): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(`${environment.apiUrl}/api/courses/list`);
  }
}
