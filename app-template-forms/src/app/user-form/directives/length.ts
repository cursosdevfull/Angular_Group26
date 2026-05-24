import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: "[lengthValidation]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: LengthValidator,
            multi: true
        }
    ]
})
export class LengthValidator implements Validator {
    @Input("lengthValidation") options: { min?: number, max?: number, fieldName: string } = {
        min: 0,
        max: 0,
        fieldName: ""
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control || !control.value) return null

        const valueLength = control.value.length

        if (this.options.min && valueLength < this.options.min) {
            return { length: `The ${this.options.fieldName.toLowerCase()} must be at least ${this.options.min} characters long` }
        }

        if (this.options.max && valueLength > this.options.max) {
            return { length: `The ${this.options.fieldName.toLowerCase()} must be at most ${this.options.max} characters long` }
        }

        /* if (valueLength < 15) {
            return { length: "The value must be at least 15 characters long" }
        } */

        return null
        //return { length: "The value must be at least 15 characters long" };
    }
}