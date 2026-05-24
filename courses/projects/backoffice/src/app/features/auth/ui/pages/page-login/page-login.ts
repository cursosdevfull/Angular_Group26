import { Component } from '@angular/core';
import { Login } from '../../views/login/login';

@Component({
  selector: 'cdev-page-login',
  imports: [Login],
  templateUrl: './page-login.html',
  styleUrl: './page-login.scss',
})
export class PageLogin {
  handleLogin(credentials: { email: string; password: string }) {
    alert(`Login attempted with email: ${credentials.email} and password: ${credentials.password}`);
  }
}
