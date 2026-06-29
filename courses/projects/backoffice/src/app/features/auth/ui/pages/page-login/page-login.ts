import { Component, effect, inject, Inject } from '@angular/core';
import { Login } from '../../views/login/login';
import { TOKEN_AUTH_APPLICATION } from '@backoffice/features/auth';
import { PORT_AUTH_APPLICATION } from '@backoffice/features/auth/domain/ports';
import { Auth } from '@backoffice/features/auth/domain';
import { StorageService } from '@backoffice/core/services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'cdev-page-login',
  imports: [Login],
  templateUrl: './page-login.html',
  styleUrl: './page-login.scss',
})
export class PageLogin {
  storage = inject(StorageService);
  router = inject(Router);

  constructor(@Inject(TOKEN_AUTH_APPLICATION) private auth: PORT_AUTH_APPLICATION) {
    effect(() => {
      const response = this.auth.responseLogin();
      if (response) {
        if ('message' in response) {
          const message = JSON.parse(response.message!);
          this.storage.setItem('access_token', message.access_token);
          this.router.navigate(['/modules/dashboard']);
        }
      }
    });
  }

  handleLogin(credentials: Auth) {
    this.auth.credentials.set(credentials);
    /*  this.auth.login(credentials).subscribe({
      next: (response) => {
        if ("access_token" in response) {
          alert(`Login successful! Access Token: ${response.access_token}, Refresh Token: ${response.refresh_token}`);
        } else {
          alert(`Login failed! Response: ${JSON.stringify(response)}`);
        }
      }
    }) */
  }
}
