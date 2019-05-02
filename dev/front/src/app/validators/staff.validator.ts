import { AbstractControl } from '@angular/forms';

export class StaffValidator {
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

    static usernameDetailValidator(usernames: string[], nameUsernameInit: string) {
        
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            console.log("nameUsernameInit : ", nameUsernameInit);
            if (control.value) {
                const checkUsername: string = control.value;
                isValid = !(usernames.find(username => username.toLowerCase() === checkUsername.toLowerCase()) && (checkUsername.toLowerCase() !== nameUsernameInit.toLowerCase()));
            }
            if (isValid) {
                return null;
            } else {
                return { username: true };
            }
        };
    }
}

