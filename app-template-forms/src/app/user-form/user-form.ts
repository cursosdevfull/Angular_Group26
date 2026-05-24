import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm, FormsModule, NgModel } from '@angular/forms';
import { LengthValidator } from './directives/length';
import { EmailValidator } from './directives/email';
import { ErrorMessage } from './components/error-message/error-message';
import { RangeValidator } from './directives/range';
import { LimitAgeByGenderValidator } from './directives/limitAgeByGender';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, LengthValidator, EmailValidator, ErrorMessage, RangeValidator, LimitAgeByGenderValidator],
  templateUrl: './user-form.html',
  styleUrl: './user-form.scss',
})
export class UserForm {
  @ViewChild("userForm") userForm!: NgForm
  @ViewChild("name") nameInput!: NgModel


  formData = {
    name: 'Sergio',
    lastname: 'Hidalgo',
    email: 'sergio.hidalgo@email.com',
    age: 22,
    gender: "female",
    id: 0
  }

  constructor() {
    //  console.log(this.userForm)
  }

  ngOnInit() {
    //console.log(this.userForm)
  }

  ngAfterViewInit() {
    console.log(this.userForm)
    /*     console.log(this.userForm.nativeElement)
        this.userForm.nativeElement.style.backgroundColor = "lightblue"
        this.userForm.nativeElement.style.border = "3px solid black" */
  }

  onSubmit() {
    console.log(this.userForm)
    console.log(this.formData)
    console.log(`is valid: ${this.userForm.valid}`)
    console.log(this.nameInput)

    if (this.userForm.valid) {
      alert("Form submitted successfully!")
    } else {
      alert("Please correct the errors in the form before submitting.")
      this.userForm.form.markAllAsTouched() // Marca todos los campos como tocados para mostrar los mensajes de error
    }
  }


}
