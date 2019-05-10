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
    });
  }

  public redirectToProductDetail(idProductRef: number){
    this.router.navigate(['product-detail/' + idProductRef]);
  }

  public onValidateCart(){
     this.command.statusCommand = 2;
     this.commandService.validateCommand(this.command, true, this.command.totalPrice);
     
   }
 
   public onContinuePurchase(){
     this.router.navigate(['']);
   }

}
