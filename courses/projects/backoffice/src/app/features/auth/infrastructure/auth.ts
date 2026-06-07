import { TOKENS, RESPONSE } from "@backoffice/core/types";
import { Auth } from "../domain";
import { PORT_AUTH_ADAPTER } from "../domain/ports/auth-adapter";

export class AuthAdapter implements PORT_AUTH_ADAPTER {
    login(credentials: Auth): TOKENS | RESPONSE {
        return {
            accessToken: "mockAccessToken",
            refreshToken: "mockRefreshToken"
        }
    }
}