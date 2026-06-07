import { Inject, Injectable } from "@angular/core";
import { Auth } from "../domain";
import { PORT_AUTH_APPLICATION } from "../domain/ports";
import { TOKEN_AUTH_ADAPTER } from "../auth.di";
import { PORT_AUTH_ADAPTER } from "../domain/ports/auth-adapter";
import { map, Observable, of } from "rxjs";
import { RESPONSE } from "@backoffice/core/types/response";

@Injectable()
export class AuthApplication implements PORT_AUTH_APPLICATION {
  constructor(@Inject(TOKEN_AUTH_ADAPTER) private authAdapter: PORT_AUTH_ADAPTER) { }

  login(credentials: Auth): Observable< { access_token: string, refresh_token: string } | RESPONSE> {
    const { email, password } = credentials.properties;
    return this.authAdapter.login(credentials).pipe(map(response => {
      if ("accessToken" in response) {
        return {access_token: response.accessToken, refresh_token: response.refreshToken}
      }

      return response
    }))
  }
}
