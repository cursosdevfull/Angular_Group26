import { HttpClient } from '@angular/common/http';
import { PORT_COURSE_ADAPTER } from '../domain/ports/course-adapter';
import { inject } from '@angular/core/primitives/di';
import { environment } from '../../../../environments/environment.development';
import { RESPONSE } from '@backoffice/core/types/response';
import { Observable } from 'rxjs';
import { Course } from '../domain';

export class CourseAdapter implements PORT_COURSE_ADAPTER {
  http = inject(HttpClient);

  getAll(page: number, limit: number) {
    return this.http.get<RESPONSE>(`${environment.apiUrl}/api/courses?page=${page}&limit=${limit}`);
  }
  getById(id: number): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(`${environment.apiUrl}/api/courses/${id}`);
  }
  create(course: Course): Observable<RESPONSE> {
    return this.http.post<RESPONSE>(`${environment.apiUrl}/api/courses`, course);
  }
  update(course: Course): Observable<RESPONSE> {
    return this.http.put<RESPONSE>(
      `${environment.apiUrl}/api/courses/${course.properties.id}`,
      course,
    );
  }
  delete(id: number): Observable<RESPONSE> {
    return this.http.delete<RESPONSE>(`${environment.apiUrl}/api/courses/${id}`);
  }
}
