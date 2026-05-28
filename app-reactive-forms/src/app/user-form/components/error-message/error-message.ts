import { Component, Input } from '@angular/core';
import { AbstractControl, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [FormsModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.scss',
})
export class ErrorMessage {
  @Input() control: AbstractControl<any> | null = null

  getErrorMessages() {
    if (!this.control || !this.control.errors) return []
    if (!this.control.touched) return []

    const errors: any[] = []

    for (const key in this.control.errors) {
      if (this.control.errors.hasOwnProperty(key)) {
        errors.push({ [key]: this.control.errors[key] });
      }
    }

    return errors.map((error) => {
      if (typeof error === "string") return error
      if (error instanceof Object && error.invalidDomain) return error.invalidDomain
      if (error instanceof Object && error.limitAgeByGender) return error.limitAgeByGender
      if (error instanceof Object && error.required) return "This field is required"
      if (error instanceof Object && error.minlength) return `Minimum length is ${error.minlength.requiredLength}`
      if (error instanceof Object && error.pattern) return "Invalid format"
      if (error instanceof Object && error.min) return `Minimum value is ${error.min.min}`
      if (error instanceof Object && error.max) return `Maximum value is ${error.max.max}`
      return "Invalid field"
    })
  }
}
