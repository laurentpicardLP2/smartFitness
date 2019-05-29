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

    static dateOfBirhdayValidator() {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const strOfBirth: string = control.value;
                let year = strOfBirth.toString().split("-")[0];
                let month = strOfBirth.toString().split("-")[1];
                let day = strOfBirth.toString().split("-")[2];
                let dateOfBirth = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10))
                isValid = !(dateOfBirth.getTime()> ((new Date()).getTime() -504918000000 )|| ( ((new Date()).getTime() - dateOfBirth.getTime()) > 3787121480763) );
            }
            if (isValid) {
                return null;
            } else {
                return { dateOfBirthday: true };
            }
        };
    }
}

