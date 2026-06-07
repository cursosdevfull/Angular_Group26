import { Component, output, signal } from '@angular/core';
import { Auth } from '@backoffice/features/auth/domain';
import { email, form, FormField, required, requiredError, validate } from '@angular/forms/signals';
import { ErrorMessage } from 'lib';

interface IAuth {
  email: string;
  password: string;
}

@Component({
  selector: 'cdev-login',
  imports: [FormField, ErrorMessage],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  onLogin = output<Auth>();

  initialData = {
    email: '',
    password: ''
  }

  loginModel = signal<IAuth>(this.initialData);

  loginForm = form(this.loginModel, schema => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Email is not valid' });
    required(schema.password, { message: 'Password is required' });
    validate(schema.password, ctx => {
      return ctx.value().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) ? null : requiredError({ message: 'Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character' });
    })
  })

  login() {
    if (this.loginForm().valid()) {
      const { email, password } = this.loginForm().value();
      const credentials = new Auth(email, password);
      this.onLogin.emit(credentials);
    } else {
      this.loginForm.email().markAsTouched();
      this.loginForm.password().markAsTouched();
      alert('Please fill in the form correctly');
    }
  }
}
