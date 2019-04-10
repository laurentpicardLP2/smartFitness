import { MaintenanceOperation } from './maintenance-operation';

export class Facility {
    public idFacility: number;
    public nameFacility: string;
    public priceSeance: number;
    public priceFacility: number;
    public dateOfPurchase: Date;
    public descriptionFacility: string;
    public imageFacility: string;
    public maintenanceOperations: MaintenanceOperation [];

    constructor() {}
}