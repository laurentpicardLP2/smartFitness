import { Item } from './item.model';

export class Product extends Item {
    public idProductRef: number;
    
    constructor(public idItem: number,
                public typeItem: string,
                public price : number,
                public quantityItem: number) { 
                    super(idItem,typeItem, price, quantityItem)
                }
}