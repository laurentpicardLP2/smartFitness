import { AbstractControl } from '@angular/forms';

export class ProductCategoryValidator {
    static nameProductCategoryValidator(productCategories: string[]) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameProductCategory: string = control.value;
                isValid = !(productCategories.find(nameProductCategory => nameProductCategory.toLowerCase() === checkNameProductCategory.toLowerCase()));
            }
            if (isValid) {
                return null;
            } else {
                return { nameProductCategory: true };
            }
        };
    }

    static nameProductCategoryDetailValidator(productCategories: string[], nameProductCategoryInit: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let isValid = false;
            if (control.value) {
                const checkNameProductCategory: string = control.value;
                isValid = !(productCategories.find(nameProductCategory => (nameProductCategory.toLowerCase() === checkNameProductCategory.toLowerCase()) && (checkNameProductCategory.toLowerCase() !== nameProductCategoryInit.toLowerCase()) ));
            }
            if (isValid) {
                return null;
            } else {
                return { nameProductCategory: true };
            }
        };
    }
}