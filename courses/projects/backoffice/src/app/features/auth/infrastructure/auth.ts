import { TOKENS, RESPONSE } from "@backoffice/core/types";
import { Auth } from "../domain";
import { PORT_AUTH_ADAPTER } from "../domain/ports/auth-adapter";
import { Observable, of } from "rxjs";

export class AuthAdapter implements PORT_AUTH_ADAPTER {
    login(credentials: Auth): Observable<TOKENS | RESPONSE> {
        return of({
            accessToken: "mockAccessToken",
            refreshToken: "mockRefreshToken"
        })
    }
}