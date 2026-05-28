import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorMessage } from './components/error-message/error-message';

interface IUser {
  name: string;
  lastname: string;
  email: string
  age: number;
  gender: string;
  id: number;
}

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, ErrorMessage],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  formData: IUser = {
    name: 'Sergio',
    lastname: 'Hidalgo',
    email: 'sergio.hidalgo@email.com',
    age: 22,
    gender: "female",
    id: 0
  }

  fg!: FormGroup

  constructor() {
    this.createForm();
  }

  private createForm() {
    this.fg = new FormGroup({
      name: new FormControl("Sergio", [Validators.required, Validators.minLength(3)]),
      lastname: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), this.validateEmailOptionB("company.com", "pe.company.com") /*this.validateEmailOptionA*/]),
      age: new FormControl(18, [Validators.required, Validators.min(18), Validators.max(65)]),
      gender: new FormControl("male", Validators.required),
    }, { validators: this.validateAgeByGender })

  }

  onSubmit() {
    if (this.fg.valid) {
      console.log(this.fg.value)
    } else {
      this.fg.markAllAsTouched()
    }
  }

  validateEmailOptionA(control: AbstractControl): ValidationErrors | null {
    if (!control || !control.value) return null;

    const email = control.value;
    const domainsAllowed = ["company.com", "pe.company.com"];

    const domain = email.substring(email.lastIndexOf("@") + 1);

    if (!domainsAllowed.includes(domain)) {
      return { invalidDomain: `Only ${domainsAllowed.join(", ")} are allowed` };
    }

    return null;
  }

  validateEmailOptionB(...domainsAllowed: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control || !control.value) return null;

      const email = control.value;
      const domain = email.substring(email.lastIndexOf("@") + 1);

      if (!domainsAllowed.includes(domain)) {
        return { invalidDomain: `Only ${domainsAllowed.join(", ")} are allowed` };
      }

      return null;
    }
  }

  validateAgeByGender(control: AbstractControl): ValidationErrors | null {
    const ctrlAge = control.get("age")
    const ctrlGender = control.get("gender")

    if (!ctrlAge || !ctrlGender) return null

    const age = parseInt(ctrlAge.value, 10)
    const gender = ctrlGender.value

    if (gender === "male" && age < 40) {
      return { limitAgeByGender: "Men must be at least 40 years old" }
    }

    if (gender === "female" && age < 25) {
      return { limitAgeByGender: "Women must be at least 25 years old" }
    }

    return null
  }
}
