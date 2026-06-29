import { inject, Injectable, signal } from '@angular/core';
import { Auth } from '../domain';
import { PORT_AUTH_APPLICATION } from '../domain/ports';
import { TOKEN_AUTH_ADAPTER } from '../auth.di';
import { PORT_AUTH_ADAPTER } from '../domain/ports/auth-adapter';
import { of, switchMap } from 'rxjs';
import { RESPONSE } from '@backoffice/core/types/response';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TOKENS } from '@backoffice/core/types';

@Injectable()
export class AuthApplication implements PORT_AUTH_APPLICATION {
  private authAdapter: PORT_AUTH_ADAPTER = inject<PORT_AUTH_ADAPTER>(TOKEN_AUTH_ADAPTER);

  public credentials = signal<Auth | null>(null);

  private obsCredentials = toObservable<Auth | null>(this.credentials).pipe(
    switchMap((credentials) => {
      if (credentials) {
        return this.authAdapter.login(credentials);
      }
      return of(null);
    }),
  );

  responseLogin = toSignal<TOKENS | RESPONSE | null>(this.obsCredentials, { initialValue: null });

  //constructor(@Inject(TOKEN_AUTH_ADAPTER) private authAdapter: PORT_AUTH_ADAPTER) {}

  /*   login(credentials: Auth): Observable<{ access_token: string; refresh_token: string } | RESPONSE> {
    const { email, password } = credentials.properties;
    return this.authAdapter.login(credentials).pipe(
      map((response) => {
        if ('accessToken' in response) {
          return { access_token: response.accessToken, refresh_token: response.refreshToken };
        }

        return response;
      }),
    );
  } */
}
