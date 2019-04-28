export class ProductRef {
    public idProductRef: number;

    constructor(
        public nameProductRef: string,
        public priceProductRef: number,
        public descriptionProductRef: string,
        public imageProductRef: string
    ) {}
}