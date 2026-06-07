import { Auth } from "../auth";

export type PORT_AUTH_APPLICATION = {
    login(credentials: Auth): void;
}
