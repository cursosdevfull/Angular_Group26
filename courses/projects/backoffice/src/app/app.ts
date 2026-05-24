import { Component } from '@angular/core';
import { PageLogin } from './features/auth/ui/pages/page-login/page-login';

@Component({
  selector: 'cdev-root',
  imports: [PageLogin],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  
}
