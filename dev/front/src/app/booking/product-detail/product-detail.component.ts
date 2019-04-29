import { Command } from 'src/app/models/command.model';
import { CommandService } from 'src/app/services/command.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProductService } from 'src/app/services/product.service';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductRef } from 'src/app/models/product-ref.model';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productRefForm: FormGroup;
  listProductRefs: BehaviorSubject<ProductRef[]>;
  idProductRef: number;
  nameProductRef: string;
  nameProductRefInit: string;
  priceProductRef: number;
  descriptionProductRef: string = "";
  imageProductRef: string = "";
  quantityProductRef: number = 1;
  priceProductFormatted: string;
  command: Command;
  nbItems: string;
  totalPriceCommand: number;
  username: string;


  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private utilsService: UtilsService,
              private commandService: CommandService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {

    this.idProductRef = +this.route.snapshot.params.idProductRef;
    this.productService.publishProductRefs();
    this.productService.findProductRef(this.idProductRef).subscribe(productRef => {
      this.nameProductRef = productRef.nameProductRef;
      this.nameProductRefInit = productRef.nameProductRef;
      this.descriptionProductRef = productRef.descriptionProductRef;
      this.priceProductRef = productRef.priceProductRef;
      this.priceProductFormatted = this.utilsService.convertIntoMonetaryFormat(this.priceProductRef);
      this.imageProductRef = productRef.imageProductRef;
    });

    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });

    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    this.commandService.nbItemsSubject.subscribe(res => {
      this.nbItems = res;
    });
     
    this.commandService.totalPriceCommandSubject.subscribe(res => {
      this.totalPriceCommand = res;
    });
 



    this.productService.publishProductRefs();
    
    this.createForm();
  }

 createForm(){
    this.productRefForm = this.formBuilder.group({
      nameProductRef: ['', [
      ]],
      priceProductRef: ['', [
      ]],
      descriptionProductRef: '',
      imageProductRef: '',
      nameProductCategory: ['', [
      ]],
      quantityProductRef: ['', [
      ]]
    });
  }

  public convertIntoMonetaryFormat(price: number){
    return this.utilsService.convertIntoMonetaryFormat(price);
  }

  public calculatePrice() {
    this.priceProductFormatted = this.utilsService.convertIntoMonetaryFormat(this.priceProductRef * this.quantityProductRef);
  }

  onOrder(idWatchCategory: number){
    this.productService.addProductToCommand(this.command,  idWatchCategory, this.username, this.nbItems, this.totalPriceCommand, this.quantityProductRef);
  }

}
