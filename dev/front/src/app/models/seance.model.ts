import { Customer } from './customer.model';
import { Item } from './item.model';
import { TimestampFacility } from './timestamp-facility.model';

export class Seance extends Item  {
    public timestampFacilities: TimestampFacility [];
    public statusSeance: number;
    public dateOfSeance: Date;
    public nbTimestamp: number;
    
    constructor(public idItem: number,
                public typeItem: string,
                public price : number) { 
                    super(idItem,typeItem, price)
                }
}