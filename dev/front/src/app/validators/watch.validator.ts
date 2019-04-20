import { AbstractControl } from '@angular/forms';

export class WatchValidator {
    static nameWatchValidator(watches: string[]) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameWatch: string = control.value;
                isValid = !(watches.find(nameWatch => nameWatch.toLowerCase() === checkNameWatch.toLowerCase()));
            }
            if (isValid) {
                return null;
            } else {
                return { nameWatch: true };
            }
        };
    }

    static nameWatchDetailValidator(watches: string[], nameWatchInit: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameWatch: string = control.value;
                isValid = !(watches.find(nameWatch => (nameWatch.toLowerCase() === checkNameWatch.toLowerCase()) && (checkNameWatch.toLowerCase() !== nameWatchInit.toLowerCase())));
            }
            if (isValid) {
                return null;
            } else {
                return { nameWatch: true };
            }
        };
    }
}