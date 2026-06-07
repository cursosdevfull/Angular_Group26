import { RESPONSE, TOKENS } from "@backoffice/core/types"
import { Auth } from "../auth"

export type PORT_AUTH_ADAPTER = {
    login(credentials: Auth): TOKENS | RESPONSE
}