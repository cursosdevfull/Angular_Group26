import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'cdev-lib-error-message',
  imports: [],
  templateUrl: './error-message.html',
  styleUrl: './error-message.css',
})
export class ErrorMessage {
  control = input.required<FieldState<any, string | number>>();

  getErrorMessages() {
    if (!this.control || !this.control().errors()) return [];
    if (!this.control().touched()) return [];

    return this.control().errors()
  }
}
