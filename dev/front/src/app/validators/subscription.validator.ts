import { AbstractControl } from '@angular/forms';

export class SubscriptionValidator {
    static nameSubscriptionValidator(subscriptions: string[]) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameSubscription: string = control.value;
                isValid = !(subscriptions.find(nameSubscription => nameSubscription.toLowerCase() === checkNameSubscription.toLowerCase()));
            }
            if (isValid) {
                return null;
            } else {
                return { nameSubscription: true };
            }
        };
    }

    static nameSubscriptionDetailValidator(subscriptions: string[], nameSubscriptionInit: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameSubscription: string = control.value;
                isValid = !(subscriptions.find(nameSubscription => (nameSubscription.toLowerCase() === checkNameSubscription.toLowerCase()) && (checkNameSubscription.toLowerCase() !== nameSubscriptionInit.toLowerCase())));
            }
            if (isValid) {
                return null;
            } else {
                return { nameSubscription: true };
            }
        };
    }
}