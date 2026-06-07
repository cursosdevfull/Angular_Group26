import { Observable } from "rxjs";
import { Auth } from "../auth";
import { RESPONSE } from "@backoffice/core/types";

export type PORT_AUTH_APPLICATION = {
    login(credentials: Auth): Observable< { access_token: string, refresh_token: string } | RESPONSE>;
}
