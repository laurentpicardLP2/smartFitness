
export class Staff{
    public idUser: number;
    public enabled: boolean;
    public dateOfRegistration: Date;
    

    constructor (
        public username: string,
        public fullname: string,
        public password: string,
        public email: string,
        public tel: string,
        public dayWorking: string,
        public hourWorking: string    
    ) {}
}