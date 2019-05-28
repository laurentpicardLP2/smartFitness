import { Command } from 'src/app/models/command.model';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { CommandService } from 'src/app/services/command.service';
import { Component, OnInit } from '@angular/core';;
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal'
import { EmailService } from 'src/app/services/email.service';
import { ItemPaypal } from 'src/app/models/item-paypal.model';
import { UnitAmount } from 'src/app/models/unit-amount.model';
import { Router } from '@angular/router';

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
  fullname: string;
  email: string;
  dateCommand: Date;

  constructor(private commandService: CommandService,
    private emailService: EmailService,
    private loginService: LoginService,
    private router: Router) {
  }
    
    public payPalConfig ? : IPayPalConfig;

    public showSuccess: boolean = false;
    public showCancel: boolean = false;
    public showError: boolean = false;
    public isHidden: boolean;
    
  
  
    ngOnInit() {
      this.isHidden = true;
      this.commandService.commandSubject.subscribe(res => {
        this.command = res;
        this.totalPrice = this.command.totalPrice;
        this.dateCommand = this.command.dateOfCommand

        setTimeout(() => this.isHidden = false, 2000);

        this.loginService.usernameSubject.subscribe(
          (res) => {
            this.username = res ;
                        this.loginService.getUserInfos(this.username).subscribe(
              (res) => {
                this.fullname = res[1];
                this.email = res[2];
              },
              (error) => { }
            );

            
          },
        )

        
        this.initConfig();
      });

      
      
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
        item1.quantity = this.command.items[i].quantityItem.toString();
        item1.category =  'DIGITAL_GOODS',
        item1.unit_amount = unit_amount;
        itemsPaypal.push(item1);
      }
      
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
          actions.order.get().then((details: any) => {
          });
  
        },
        onClientAuthorization: (data) => {
          this.showSuccess = true;
          this.commandService.setNbItemsSubject("");
          this.emailService.sendEmailAfterPaypal(this.command.idCommand, this.command.totalPrice, this.username);
          this.router.navigate(['acknoledgment/' + this.email + '/' + this.command.idCommand + '/' + this.command.totalPrice + '/' + this.username + '/' + this.fullname + '/' + this.dateCommand]);
        },
        onCancel: (data, actions) => {
          this.isHidden = false;
          this.showCancel = true;
  
        },
        onError: err => {
          this.isHidden = false;
           this.showError = true;
        },
        onClick: () => {
          this.isHidden = true;
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
   }
  
   
}

export function testFirst(){
  let a: number = 3;
  let b: number = 8;
  return a+b;
  }
 