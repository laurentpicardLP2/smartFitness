import { AbstractControl } from '@angular/forms';

export class ProductRefValidator {
    static nameProductRefValidator(productRefs: string[]) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameProductRef: string = control.value;
                isValid = !(productRefs.find(nameProductRef => nameProductRef.toLowerCase() === checkNameProductRef.toLowerCase()));
            }
            if (isValid) {
                return null;
            } else {
                return { nameProductRef: true };
            }
        };
    }

    static nameProductRefDetailValidator(productRefs: string[], nameProductRefInit: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameProductRef: string = control.value;
                isValid = !(productRefs.find(nameProductRef => (nameProductRef.toLowerCase() === checkNameProductRef.toLowerCase()) && (checkNameProductRef.toLowerCase() !== nameProductRefInit.toLowerCase()) ));
            }
            if (isValid) {
                return null;
            } else {
                return { nameProductRef: true };
            }
        };
    }
}