import { MaintenanceOperation } from 'src/app/models/maintenance-operation.model';

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