import { Command } from 'src/app/models/command.model';
import { CommandService } from 'src/app/services/command.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, OnInit } from '@angular/core';
import { ProductRef } from 'src/app/models/product-ref.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-favorite-product',
  templateUrl: './favorite-product.component.html',
  styleUrls: ['./favorite-product.component.css']
})
export class FavoriteProductComponent implements OnInit {
  listFavoriteProducts: BehaviorSubject<ProductRef[]>;
  command: Command;
  nbItems: string;
  totalPrice: number;
  isHasItems: boolean= false;

  constructor(private productService: ProductService,
              private router: Router,
              private commandService: CommandService) { }

  ngOnInit() {
    this.productService.getFavoriteProducts().subscribe(res => {
      this.listFavoriteProducts = this.productService.listFavoriteProducts$;
    });

    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
      console.log("this.command : ", this.command);
      this.isHasItems = this.command.items.length > 0;
      this.totalPrice = 0;
      for(let i=0; i< this.command.items.length; i++){
        this.totalPrice += this.command.items[i].price;
      }
    });
  }

  public redirectToProductDetail(idProductRef: number){
    this.router.navigate(['product-detail/' + idProductRef]);
  }

  public onValidateCart(){
    this.command.totalPrice = this.totalPrice;
     this.command.statusCommand = 2;
     this.commandService.validateCommand(this.command, true);
     
   }
 
   public onContinuePurchase(){
     this.router.navigate(['']);
   }

}
