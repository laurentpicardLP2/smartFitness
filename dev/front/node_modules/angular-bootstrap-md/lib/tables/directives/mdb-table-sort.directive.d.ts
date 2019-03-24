export declare class MdbTableSortDirective {
    dataSource: Array<any>;
    sortBy: string;
    sorted: boolean;
    onclick(): void;
    constructor();
    trimWhiteSigns(headElement: any): any;
    sortDataBy(key: string | any): void;
}
