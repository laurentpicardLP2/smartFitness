import { AbstractControl } from '@angular/forms';

export class FacilityCategoryValidator {
    static nameFacilityCategoryValidator(facilityCategories: string[]) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameFacilityCategory: string = control.value;
                isValid = !(facilityCategories.find(nameFacilityCategory => nameFacilityCategory.toLowerCase() === checkNameFacilityCategory.toLowerCase()));
            }
            if (isValid) {
                return null;
            } else {
                return { nameFacilityCategory: true };
            }
        };
    }

    static nameFacilityCategoryDetailValidator(facilityCategories: string[], nameFacilityCategoryInit: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameFacilityCategory: string = control.value;
                isValid = !(facilityCategories.find(nameFacilityCategory => (nameFacilityCategory.toLowerCase() === checkNameFacilityCategory.toLowerCase()) && (checkNameFacilityCategory.toLowerCase() !== nameFacilityCategoryInit.toLowerCase())));
            }
            if (isValid) {
                return null;
            } else {
                return { nameFacilityCategory: true };
            }
        };
    }
}