import { LoginService } from 'src/app/services/login.service';
import { SyntheseService } from 'src/app/services/synthese.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Command } from 'src/app/models/command.model';
import { CommandService } from 'src/app/services/command.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-composition',
  templateUrl: './cart-composition.component.html',
  styleUrls: ['./cart-composition.component.css']
})
export class CartCompositionComponent implements OnInit {
  username: string;
  command: Command;
  nbItems: string;
  totalPrice: number;
  isHasItems: boolean= false;

  constructor(private commandService: CommandService,
              private syntheseService: SyntheseService,
              private loginService: LoginService,
              private utilsService: UtilsService,
              private router: Router) { }

  ngOnInit() {
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
      console.log("this.command : ", this.command);
      this.isHasItems = this.command.items.length > 0;
      this.totalPrice = 0;
      for(let i=0; i< this.command.items.length; i++){
        this.totalPrice += (this.command.items[i].price * this.command.items[i].quantityItem);
      }
    });

    this.commandService.nbItemsSubject.subscribe(res => {
      this.nbItems = res;
    });

    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });

  }

  formatNameItem(typeItem: string){
    return typeItem.split(":")[0];
  }

  public onDeleteItem(idItem: number, priceItem: number){
    this.totalPrice -= Math.round((priceItem)*100)/100;
    
    this.commandService.setTotalPriceCommandSubject(this.totalPrice);
    this.syntheseService.deleteItemFromCart(this.command, idItem, this.nbItems, this.totalPrice);
  }

  public convertIntoMonetaryFormat(priceItem: number){
    return this.utilsService.convertIntoMonetaryFormat(priceItem);
  }

  public onValidateCart(){
   this.command.totalPrice = this.totalPrice;
    this.command.statusCommand = 2;
    this.commandService.validateCommand(this.command, true, this.totalPrice);
    
  }

  public onContinuePurchase(){
    this.router.navigate(['']);
  }

}
