import { Directive } from "@angular/core";
import { Validator, FormGroup, NG_VALIDATORS } from "@angular/forms";

@Directive({
    selector: '[validateLocation]',
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}] 
    // use this syntax to add custom validators to ng_validators, multi: true tells it to add location validator to existing list of validators
    // other wise it wil lover write.
})
export class LocationValidator implements Validator {

    validate(formGroup: FormGroup): { [key: string]: any; } {
        let addressControl = formGroup.controls['address']
        let cityControl = formGroup.controls['city']
        let countryControl = formGroup.controls['country']
        let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl'] // online url is on a different node
        // go to parent of this formGroup then grab onlineUrl from parent form

        if((addressControl && addressControl.value 
            && cityControl && cityControl.value 
            && countryControl && countryControl.value) 
            || (onlineUrlControl && onlineUrlControl.value) ) {
            return null
        } else {
            return {validateLocation : false}
        }

    }

    registerOnValidatorChange?(fn: () => void): void {
        throw new Error("Method not implemented.");
    }
}