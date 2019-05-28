import { ManagerService } from 'src/app/services/manager.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileInformation } from '../file-information';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductRef } from 'src/app/models/product-ref.model';
import { BehaviorSubject } from 'rxjs';
import { ConfirmValidParentMatcher,  errorMessages} from '../../services/custom-validators.service';
import { ProductRefValidator } from 'src/app/validators/product-ref.validator';

@Component({
  selector: 'app-product-ref-new',
  templateUrl: './product-ref-new.component.html',
  styleUrls: ['./product-ref-new.component.css']
})
export class ProductRefNewComponent implements OnInit {

  productRefForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  listProductRefs: BehaviorSubject<ProductRef[]>;
  idProductCategory: number;
  idProductRef: number;
  nameProductRef: string;
  priceProductRef: number;
  descriptionProductRef: string = "";
  imageProductRef: string = "";
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  listProductCategories: BehaviorSubject<ProductCategory[]>;

  @ViewChild('fileInput')
  fileInput: ElementRef;
  
  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private managerService: ManagerService) {
 
  }

  ngOnInit(): void {
    this.productService.getNameProductCategories().subscribe(res => {
      this.listProductCategories = this.productService.listProductCategories$;
    });

    this.productService.publishProductRefs();
    
    this.createForm();
  }

  createForm(){
    this.productRefForm = this.formBuilder.group({
      idProductCategory: null,
      nameProductRef: ['', [
        Validators.required,
        Validators.minLength(1),
        ProductRefValidator.nameProductRefValidator(this.productService.listNameProductRefs)
      ]],
      priceProductRef: ['', [
        Validators.required
      ]],
      descriptionProductRef: '',
      imageProductRef: '',
      userFile: null
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
    this.fileInput.nativeElement.click();
  }



  public onRegister() {
      const data: FormData = new FormData();
      let productRef = new ProductRef(this.nameProductRef, this.priceProductRef,this.descriptionProductRef, this.imageProductRef);

      if (this.file !== undefined){
        data.append('data', this.file, this.nameProductRef + "_" + this.file.name);
  
        this.imageProductRef = this.nameProductRef + "_" + this.file.name;
        productRef.imageProductRef = this.imageProductRef;
        data.append('data', this.file, this.nameProductRef + "_" + this.file.name);
        this.productService.addProductRef(this.idProductCategory, productRef , false);
        this.managerService.addImage(data, "productRefForm");
      }
      else {
        this.productService.addProductRef(this.idProductCategory, productRef , true);
       }
     
  }

}
