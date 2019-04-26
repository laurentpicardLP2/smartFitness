export class Evenement{
    public idEvt: number;
        
    
    constructor (
        public titleEvt: string,
        public descriptionEvt: string,
        public startDateTimeEvt: Date,
        public endDateTimeEvt: Date,
        public imageEvt: string,
        public videoEvt: string
        
    ) {}
}


