import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: "[rangeValidation]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: RangeValidator,
            multi: true
        }
    ]
})
export class RangeValidator implements Validator {
    @Input("rangeValidation") options: { min: number, max: number, fieldName: string } = {
        min: 0,
        max: 0,
        fieldName: ""
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control || !control.value) return null

        const value = parseInt(control.value, 10)

        if (value < this.options.min) {
            return { range: `The ${this.options.fieldName.toLowerCase()} must be greater than or equal to ${this.options.min}` }
        }

        if (value > this.options.max) {
            return { range: `The ${this.options.fieldName.toLowerCase()} must be less than or equal to ${this.options.max}` }
        }

        return null
    }
}