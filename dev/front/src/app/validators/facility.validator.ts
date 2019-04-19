import { AbstractControl } from '@angular/forms';

export class FacilityValidator {
    static nameFacilityValidator(facilities: string[]) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameFacility: string = control.value;
                isValid = !(facilities.find(nameFacility => nameFacility === checkNameFacility));
            }
            if (isValid) {
                return null;
            } else {
                return { nameFacility: true };
            }
        };
    }

    static nameFacilityDetailValidator(facilities: string[], nameFacilityInit: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameFacility: string = control.value;
                isValid = !(facilities.find(nameFacility => (nameFacility === checkNameFacility) && (checkNameFacility !== nameFacilityInit)));
            }
            if (isValid) {
                return null;
            } else {
                return { nameFacility: true };
            }
        };
    }
}