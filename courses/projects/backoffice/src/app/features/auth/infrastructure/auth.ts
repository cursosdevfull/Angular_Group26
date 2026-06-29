import { TOKENS, RESPONSE } from '@backoffice/core/types';
import { Auth } from '../domain';
import { PORT_AUTH_ADAPTER } from '../domain/ports/auth-adapter';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export class AuthAdapter implements PORT_AUTH_ADAPTER {
  http = inject(HttpClient);

  login(credentials: Auth): Observable<TOKENS | RESPONSE> {
    return this.http.post<TOKENS | RESPONSE>(
      `${environment.apiUrl}/api/auth/login`,
      credentials.properties,
    );
  }
}
