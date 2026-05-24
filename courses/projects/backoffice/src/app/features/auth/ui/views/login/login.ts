import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cdev-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  @Output() onLogin = new EventEmitter<{ email: string; password: string }>();
  private email = '';
  private password = '';

  inputEmail(evt: Event) {
    const input = evt.target as HTMLInputElement;
    this.email = input.value;
  }

  inputPassword(evt: Event) {
    const input = evt.target as HTMLInputElement;
    this.password = input.value;
  }

  login() {
    if(!this.email || !this.password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    this.onLogin.emit({ email: this.email, password: this.password });
  }
}
