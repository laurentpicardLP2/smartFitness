import { ManagerService } from 'src/app/services/manager.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileInformation } from '../file-information';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductRef } from 'src/app/models/product-ref.model';
import { BehaviorSubject } from 'rxjs';
import { ConfirmValidParentMatcher,  errorMessages} from '../../services/custom-validators.service';
import { ProductRefValidator } from 'src/app/validators/product-ref.validator';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-ref-detail',
  templateUrl: './product-ref-detail.component.html',
  styleUrls: ['./product-ref-detail.component.css']
})
export class ProductRefDetailComponent implements OnInit {

  productRefForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  listProductRefs: BehaviorSubject<ProductRef[]>;
  nameProductCategory: string;
  idProductRef: number;
  nameProductRef: string;
  nameProductRefInit: string;
  priceProductRef: number;
  descriptionProductRef: string = "";
  imageProductRef: string = "";
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  listProductCategories: BehaviorSubject<ProductCategory[]>;
  productCategoryAssociateToProductRef: ProductCategory;

  @ViewChild('fileInput')
  fileInput: ElementRef;
  username: string;
  password: string;
  bChangeImage: boolean = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private loginService: LoginService,
              private managerService: ManagerService,
              private router: Router) { }

  ngOnInit() {

    this.idProductRef = +this.route.snapshot.params.idProductRef;
    this.productService.publishProductRefs();
    this.productService.findProductRef(this.idProductRef).subscribe(productRef => {
      this.nameProductRef = productRef.nameProductRef;
      this.nameProductRefInit = productRef.nameProductRef;
      this.priceProductRef = productRef.priceProductRef;
      this.descriptionProductRef = productRef.descriptionProductRef;
      this.imageProductRef = productRef.imageProductRef;
    });

    this.productService.getProductCategoryAssociateToProductRef(this.idProductRef).subscribe(res => {
      this.productCategoryAssociateToProductRef = res;
      this.productService.publishProductCategoryAssociateToProductRef(this.idProductRef);
      this.nameProductCategory = this.productCategoryAssociateToProductRef.nameProductCategory;
    });


    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });

    this.loginService.passwordSubject.subscribe(res => {
      this.password = res;
    });

    this.productService.getNameProductCategories().subscribe(res => {
      this.listProductCategories = this.productService.listProductCategories$;
    });

    this.productService.publishProductRefs();
    
    this.createForm();
  }

 createForm(){
    this.productRefForm = this.formBuilder.group({
      nameProductRef: ['', [
        Validators.required,
        Validators.minLength(1),
        ProductRefValidator.nameProductRefDetailValidator(this.productService.listNameProductRefs, this.nameProductRefInit)
      ]],
      priceProductRef: ['', [
        Validators.required
      ]],
      descriptionProductRef: '',
      imageProductRef: '',
      userFile: null,
      nameProductCategory: ['', [
        Validators.required
      ]]
    });
  }


  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.productRefForm.get('imageProductRef').setValue(this.file.name);
     this.fileInformation = null;
    }
  }

  selectFile(): void {
    this.bChangeImage = true;
    this.fileInput.nativeElement.click();
  }

  public onUpdate() {
    this.descriptionProductRef = (this.descriptionProductRef == "") ? "" : this.descriptionProductRef;
    this.imageProductRef = (this.imageProductRef == "") ? "" : this.imageProductRef;
    let productRef = new ProductRef(this.nameProductRef, this.priceProductRef,this.descriptionProductRef, this.imageProductRef);
    productRef.idProductRef = this.idProductRef;
    
    const data: FormData = new FormData();
      
    if (this.file !== undefined){
      this.imageProductRef = this.nameProductRef + "_" + this.file.name;
      data.append('data', this.file, this.nameProductRef + "_" + this.file.name);
      productRef.imageProductRef = this.imageProductRef;
      this.productService.updateProductRef(productRef, this.nameProductCategory, false);
      this.managerService.addImage(data, this.username, this.password, "productRefForm");
    }
    else {
      this.productService.updateProductRef(productRef, this.nameProductCategory, true);
    }
  }

}
