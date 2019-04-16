import { LoginService } from 'src/app/services/login.service';
import { SyntheseService } from 'src/app/services/synthese.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Command } from 'src/app/models/command.model';
import { CommandService } from 'src/app/services/command.service';
import { Component, OnInit } from '@angular/core';

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
  
  constructor(private commandService: CommandService,
              private syntheseService: SyntheseService,
              private loginService: LoginService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
      console.log("this.command.items.length : ", this.command.items.length);
      this.totalPrice = 0;
      for(let i=0; i< this.command.items.length; i++){
        this.totalPrice += this.command.items[i].price;
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

  public onDeleteItem(idItem: number){
    this.syntheseService.deleteItemFromCart(this.command, idItem, this.nbItems);
  }

  public convertIntoMonetaryFormat(priceItem: number){
    return this.utilsService.convertIntoMonetaryFormat(priceItem);
  }

  public onValidateCart(){
   this.command.totalPrice = this.totalPrice;
    this.commandService.validateCommand(this.command,this.username);
    
  }

}