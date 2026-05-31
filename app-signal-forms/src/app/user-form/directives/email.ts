import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: "[emailValidation]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: EmailValidator,
            multi: true
        }
    ]
})
export class EmailValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        if (!control || !control.value) return null

        const value = control.value
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!emailPattern.test(value)) {
            return { email: "Invalid email format" }
        }

        return null
    }
}