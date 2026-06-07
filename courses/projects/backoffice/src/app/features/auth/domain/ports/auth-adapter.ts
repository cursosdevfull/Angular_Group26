import { RESPONSE, TOKENS } from "@backoffice/core/types"
import { Auth } from "../auth"
import { Observable } from "rxjs/internal/Observable"

export type PORT_AUTH_ADAPTER = {
    login(credentials: Auth): Observable<TOKENS | RESPONSE>
}