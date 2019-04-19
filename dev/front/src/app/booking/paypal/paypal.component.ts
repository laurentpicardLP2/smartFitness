import { Command } from 'src/app/models/command.model';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { CommandService } from 'src/app/services/command.service';
import { Component, OnInit } from '@angular/core';;
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal'
import { EmailService } from 'src/app/services/email.service';
import { ItemPaypal } from 'src/app/models/item-paypal.model';
import { UnitAmount } from 'src/app/models/unit-amount.model';

declare var hljs: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {
  command: Command;
  totalPrice: number;
  username: string;

  constructor(private commandService: CommandService,
    private emailService: EmailService,
    private loginService: LoginService,
    private utilsService: UtilsService) {
  }
    
    public payPalConfig ? : IPayPalConfig;

    public showSuccess: boolean = false;
    public showCancel: boolean = false;
    public showError: boolean = false;
    
  
  
    ngOnInit() {
      this.commandService.commandSubject.subscribe(res => {
        this.command = res;
        console.log("res : ", res);
        this.totalPrice = this.command.totalPrice;
        // this.commandService.getItemsPaypalAdaptater(this.command.idCommand).subscribe()
        this.initConfig();
      });

      this.loginService.usernameSubject.subscribe(
        (res) => this.username = res
      )
      
    }
  
    ngAfterViewInit(): void {
      this.prettify();
    }
  
    
  
    private initConfig(): void {
      let itemsPaypal: ItemPaypal[] = [];
      let unit_amount: UnitAmount;
      let item1: ItemPaypal;


      
      for(let i=0; i< this.command.items.length; i++){
        unit_amount = new UnitAmount();
        unit_amount.currency_code = 'EUR';
        unit_amount.value = this.command.items[i].price.toString();

        item1 = new ItemPaypal();
        item1.name = this.command.items[i].typeItem.split(":")[0];
        item1.quantity = '1';
        item1.category =  'DIGITAL_GOODS',
        item1.unit_amount = unit_amount;
        itemsPaypal.push(item1);
      }

      // unit_amount = new UnitAmount();
      // unit_amount.currency_code = 'EUR';
      // unit_amount.value = this.totalPrice.toString();

      // item1 = new ItemPaypal();
      // item1.name = 'Seance'
      // item1.quantity = '1';
      // item1.category =  'DIGITAL_GOODS',
      // item1.unit_amount = unit_amount;
      
      // itemsPaypal.push(item1);
      
      this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: this.totalPrice.toString(),
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: this.totalPrice.toString()
                  }
                }
              },
              items: itemsPaypal
            }
          ]
        },
        advanced: {
          commit: 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical'
        },
        onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then((details: any) => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
          });
  
        },
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
          this.showSuccess = true;
          this.commandService.setNbItemsSubject("");
          this.emailService.sendEmailAfterPaypal(this.command.idCommand, this.command.totalPrice, this.username);
        },
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          this.showCancel = true;
  
        },
        onError: err => {
          console.log('OnError', err);
          this.showError = true;
        },
        onClick: () => {
          console.log('onClick');
          this.resetStatus();
        },
      };
    }
  
    private resetStatus(): void {
      this.showError = false;
      this.showSuccess = false;
      this.showCancel = false;
    }
  
    private prettify(): void {
      //hljs.initHighlightingOnLoad();
    }
  
   
}

export function testFirst(){
  let a: number = 3;
  let b: number = 8;
  return a+b;
  }
 

//  export function testFirst(state = {} , action){
//   switch(action.type){
//     case ACTION.START :
//       return Object.assign({}, state,{start:true});
//     default: 
//     return state;
  
