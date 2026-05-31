import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: "[limitAgeByGender]",
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: LimitAgeByGenderValidator,
            multi: true
        }
    ]
})
export class LimitAgeByGenderValidator implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
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