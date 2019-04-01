import { Item } from './item.model';

export class Subscription extends Item {
    public idSubscriptionCategory: number;
    public dateStartOfSubscription: Date;
    public dateEndOfSubscription: Date;
    
    constructor(public idItem: number,
                public typeItem: string,
                public price : number) { 
                    super(idItem,typeItem, price)
                }
}
