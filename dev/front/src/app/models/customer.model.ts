
export class Customer{
    public idUser: number;
    public enabled: boolean;
    public dateOfRegistration: Date;
    public modelWatch: string;
    public typeSubscription: string;

    constructor (
        public username: string,
        public fullName: string,
        public password: string,
        public email: string,
        public tel: string,
        public dateOfBirthday: Date,
        public domesticAddress: string,
        public domesticCp: string,
        public domesticCity: string,
        public domesticCountry: string,
        public deliveryAddress: string,
        public deliveryCp: string,
        public deliveryCity: string,
        public deliveryCountry: string       
    ) {}
}