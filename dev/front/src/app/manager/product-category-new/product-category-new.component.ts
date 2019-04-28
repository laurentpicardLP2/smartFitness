import { ProductCategory } from 'src/app/models/product-category.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject } from 'rxjs';
import {ConfirmValidParentMatcher, errorMessages} from '../../services/custom-validators.service';
import { ProductCategoryValidator } from 'src/app/validators/product-category.validator';

@Component({
  selector: 'app-product-category-new',
  templateUrl: './product-category-new.component.html',
  styleUrls: ['./product-category-new.component.css']
})
export class ProductCategoryNewComponent implements OnInit {
  productCategoryForm: FormGroup;
  listProductCategories: BehaviorSubject<ProductCategory[]>;
  productCategories: ProductCategory[];
  nameProductCategory : string;
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService) {
 
  }

  ngOnInit(): void {

    this.productService.getProductCategories().subscribe(res => {
      this.productCategories = res;
      this.productService.publishProductCategories();
      this.listProductCategories = this.productService.listProductCategories$;
    });
    
    this.createForm();
  }

  createForm(){
    this.productCategoryForm = this.formBuilder.group({
      nameProductCategory: ['', [
        Validators.required,
        Validators.minLength(1),
        ProductCategoryValidator.nameProductCategoryValidator(this.productService.listNameProductCategories)
      ]]
    }); 
  }

  public onValidate() {
    this.productService.addProductCategory(this.nameProductCategory);
  }
}
