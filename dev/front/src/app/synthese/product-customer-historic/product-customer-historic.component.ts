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

@Component({
  selector: 'app-product-customer-historic',
  templateUrl: './product-customer-historic.component.html',
  styleUrls: ['./product-customer-historic.component.css']
})
export class ProductCustomerHistoricComponent implements OnInit {

  productRefForm: FormGroup;
  listProductRefs: BehaviorSubject<ProductRef[]>;
  idItem: number;
  quantityItem: number;

  idProductRef: number;
  idCommand: number;
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
  priceTotalFormatted: string;
  priceTotal: number;



  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private utilsService: UtilsService,
              private commandService: CommandService,
              private router: Router) { }

  ngOnInit() {

    this.idItem = +this.route.snapshot.params.idItem;
    this.quantityItem = +this.route.snapshot.params.quantityItem;
    this.idCommand = +this.route.snapshot.params.idCommand;

    this.productService.getProductRefAssociateToIdItem(this.idItem).subscribe(
      productRef => {
        this.nameProductRef = productRef.nameProductRef;
        this.nameProductRefInit = productRef.nameProductRef;
        this.descriptionProductRef = productRef.descriptionProductRef;
        this.priceProductRef = productRef.priceProductRef;
        this.priceProductFormatted = this.utilsService.convertIntoMonetaryFormat(this.priceProductRef);
        this.priceTotalFormatted = this.utilsService.convertIntoMonetaryFormat(this.priceProductRef * this.quantityItem);
        this.imageProductRef = productRef.imageProductRef;
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
 

    
    this.createForm();
  }

 createForm(){
    this.productRefForm = this.formBuilder.group({
      nameProductRef: ['', [
      ]],
      priceProductRef: ['', [
      ]],
      priceTotal: ['', [

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

  onBackCommand(){
    this.router.navigate(['command-detail/' + this.idCommand]);
  }

}
