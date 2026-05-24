import { Component, Input } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [FormsModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
})
export class ErrorMessage {
  @Input() control!: NgModel | NgForm

  getErrorMessages() {
    if (this.control instanceof NgForm) {
      if (!this.control.form || !this.control.form.errors) return []
      if (!this.control.form.touched) return []
      return Object.values(this.control.form.errors)
    } else {
      if (!this.control || !this.control.errors) return []
      if (!this.control.touched) return []
      return Object.values(this.control.errors)
    }
  }
}
