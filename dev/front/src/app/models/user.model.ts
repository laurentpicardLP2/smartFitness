import { Authority } from './authority.model';

export class User{
    public idUser: number;
    public fullname: string;
    public email: string;
    public tel: string;
    public dateOfRegistration: Date;
    public authority : Authority;

    constructor(
        public username: string,
        public password: string
    ) {}
}

