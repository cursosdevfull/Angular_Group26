import { Component, Inject } from '@angular/core';
import { Login } from '../../views/login/login';
import { TOKEN_AUTH_APPLICATION } from '@backoffice/features/auth';
import { PORT_AUTH_APPLICATION } from '@backoffice/features/auth/domain/ports';
import { Auth } from '@backoffice/features/auth/domain';

@Component({
  selector: 'cdev-page-login',
  imports: [Login],
  templateUrl: './page-login.html',
  styleUrl: './page-login.scss',
})
export class PageLogin {
  constructor(@Inject(TOKEN_AUTH_APPLICATION) private auth: PORT_AUTH_APPLICATION) { }

  handleLogin(credentials: Auth) {
    this.auth.login(credentials).subscribe({
      next: (response) => {
        if ("access_token" in response) {
          alert(`Login successful! Access Token: ${response.access_token}, Refresh Token: ${response.refresh_token}`);
        } else {
          alert(`Login failed! Response: ${JSON.stringify(response)}`);
        }
      }
    })
  }
}
