import { AbstractControl } from '@angular/forms';

export class CustomValidator {
    static usernameValidator(usernames: string[]) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkUsername: string = control.value;
                isValid = !(usernames.find(username => username.toLowerCase() === checkUsername.toLowerCase()));
            }
            if (isValid) {
                return null;
            } else {
                return { username: true };
            }
        };
    }
}