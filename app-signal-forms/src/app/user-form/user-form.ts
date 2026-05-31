import { Component, signal, ViewChild } from '@angular/core';
import { form, FormField, max, min, minLength, required, requiredError, validate } from '@angular/forms/signals';
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
  imports: [FormField, ErrorMessage],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {

  initialData: IUser = {
    name: 'Sergio',
    lastname: '',
    email: 'sergio.hidalgo@email.com',
    age: 10,
    gender: "female",
    id: 0
  }

  domainsAllowed = ["company.com", "pe.company.com"]

  model = signal<IUser>(this.initialData);

  userForm = form(this.model, schema => {
    required(schema.name, { message: 'Name is required' });
    minLength(schema.name, 3, { message: 'Name must be at least 3 characters' });
    required(schema.lastname, { message: 'Lastname is required' });
    minLength(schema.lastname, 3, { message: 'Lastname must be at least 3 characters' });
    required(schema.email, { message: 'Email is required' });
    validate(schema.email, ctx => {
      return ctx.value().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ? null : requiredError({ message: 'Email is not valid' });
    });
    validate(schema.email, ctx => {
      const email = ctx.value();
      const domain = email.substring(email.lastIndexOf("@") + 1);
      return this.domainsAllowed.includes(domain) ? null : requiredError({ message: `Email domain must be one of the following: ${this.domainsAllowed.join(', ')}` });
    });
    min(schema.age, 18, { message: 'Age must be at least 18' });
    max(schema.age, 120, { message: 'Age must be at most 120' });
    validate(schema, ctx => {
      if (!ctx) return null;

      const ctrlAge = ctx.fieldTree.age;
      const ctrlGender = ctx.fieldTree.gender

      if (!ctrlAge || !ctrlGender) return null;

      const age = ctrlAge().value()
      const gender = ctrlGender().value()

      if (gender === "male" && age < 40) return requiredError({ message: "Men under 40 are not allowed" });
      if (gender === "female" && age < 25) return requiredError({ message: "Women under 25 are not allowed" });

      return null
    })
  })

  onSubmit() {
    if (this.userForm().valid()) {
      console.log('Form submitted successfully');
      console.log(this.userForm().value());
    } else {
      this.userForm.age().markAsTouched()
      this.userForm.name().markAsTouched()
      this.userForm.lastname().markAsTouched()
      this.userForm.email().markAsTouched()
      this.userForm.gender().markAsTouched()
    }
  }


}
