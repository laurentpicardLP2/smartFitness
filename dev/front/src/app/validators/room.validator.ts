import { AbstractControl } from '@angular/forms';

export class RoomValidator {
    static nameRoomValidator(rooms: string[]) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameRoom: string = control.value;
                isValid = !(rooms.find(nameRoom => nameRoom === checkNameRoom));
            }
            if (isValid) {
                return null;
            } else {
                return { nameRoom: true };
            }
        };
    }

    static nameRoomDetailValidator(rooms: string[], nameRoomInit: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameRoom: string = control.value;
                isValid = !(rooms.find(nameRoom => (nameRoom === checkNameRoom) && (checkNameRoom !== nameRoomInit)));
            }
            if (isValid) {
                return null;
            } else {
                return { nameRoom: true };
            }
        };
    }
}