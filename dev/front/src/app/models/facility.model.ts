import { Room } from 'src/app/models/room.model';
import { FacilityCategory } from 'src/app/models/facility-category.model';

export class Facility {
    public idFacility: number;
    public nameFacility: string;
    public priceSeance: number;
    public priceFacility: number;
    public dateOfPurchase: Date;
    public descriptionFacility: string;
    public imageFacility: string;

    constructor() {}
}