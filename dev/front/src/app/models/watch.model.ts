import { Item } from './item.model';

export class Watch extends Item {
    public idWatchCategory: number;
    
    constructor(public idItem: number,
                public typeItem: string,
                public price : number) { 
                    super(idItem,typeItem, price)
                }
}
