import { ProductCategory } from 'src/app/models/product-category.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject } from 'rxjs';
import {ConfirmValidParentMatcher, errorMessages} from '../../services/custom-validators.service';
import { ProductCategoryValidator } from 'src/app/validators/product-category.validator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-category-detail',
  templateUrl: './product-category-detail.component.html',
  styleUrls: ['./product-category-detail.component.css']
})
export class ProductCategoryDetailComponent implements OnInit {

  idProductCategory: number;
  nameProductCategory: string;
  nameProductCategoryInit: string;
  productCategoryForm: FormGroup;
  listProductCategories: BehaviorSubject<ProductCategory[]>;
  productCategories: ProductCategory[];
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit() {
    this.idProductCategory = +this.route.snapshot.params.idProductCategory;
    this.productService.publishProductCategories();
    this.productService.findProductCategory(this.idProductCategory).subscribe(productCategory => {
      this.idProductCategory = productCategory.idProductCategory;
      this.nameProductCategory = productCategory.nameProductCategory;
      this.nameProductCategoryInit = productCategory.nameProductCategory;
    });
    this.createForm();
  }

  createForm(){
    this.productCategoryForm = this.formBuilder.group({
      nameProductCategory: ['', [
        Validators.required,
        Validators.minLength(1),
        ProductCategoryValidator.nameProductCategoryDetailValidator(this.productService.listNameProductCategories,this.nameProductCategoryInit )
      ]]
    }); 
  }
  
  public onUpdate() {
    this.productService.updateProductCategory(this.idProductCategory,this.nameProductCategory);
  }
}
