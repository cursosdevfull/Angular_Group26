import { Inject, Injectable } from "@angular/core";
import { Auth } from "../domain";
import { PORT_AUTH_APPLICATION } from "../domain/ports";
import { TOKEN_AUTH_ADAPTER } from "../auth.di";
import { PORT_AUTH_ADAPTER } from "../domain/ports/auth-adapter";

@Injectable()
export class AuthApplication implements PORT_AUTH_APPLICATION {
  constructor(@Inject(TOKEN_AUTH_ADAPTER) private authAdapter: PORT_AUTH_ADAPTER) { }

  login(credentials: Auth): void {
    const { email, password } = credentials.properties;
    const tokens = this.authAdapter.login(credentials);
    console.log("Logged in with email:", email);
    console.log("Received tokens:", tokens);
  }
}
