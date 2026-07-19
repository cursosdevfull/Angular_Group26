import { HttpClient } from '@angular/common/http';
import { PORT_COURSE_ADAPTER } from '../domain/ports/course-adapter';
import { inject } from '@angular/core/primitives/di';
import { environment } from '../../../../environments/environment.development';
import { RESPONSE } from '@store-front/core/types/response';
import { Observable } from 'rxjs';

export class CourseAdapter implements PORT_COURSE_ADAPTER {
  http = inject(HttpClient);

  getAll(page: number, limit: number): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(
      `${environment.apiUrl}/api/public/courses?page=${page}&limit=${limit}`,
    );
  }
  getById(id: number): Observable<RESPONSE> {
    return this.http.get<RESPONSE>(`${environment.apiUrl}/api/public/courses/${id}`);
  }
}
