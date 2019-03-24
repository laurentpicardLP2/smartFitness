import { Item } from './item.model';
import { Customer } from './customer.model';
import { Seance } from './seance.model';

export class Command{
    public idCommand: number;
    public totalPrice: number;
    public statusCommand: number;
    public customer:Customer;
    public dateOfCommand: Date;
    public items: Item[] = [];

    constructor() {}


}