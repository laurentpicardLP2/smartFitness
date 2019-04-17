import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal'

declare var hljs: any;

@Component({
  selector: 'app-timestamp-facility',
  templateUrl: './timestamp-facility.component.html',
  styleUrls: ['./timestamp-facility.component.css']
})
export class TimestampFacilityComponent implements OnInit {

  public payPalConfig ? : IPayPalConfig;

  public showSuccess: boolean = false;
  public showCancel: boolean = false;
  public showError: boolean = false;
  

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.initConfig();
  }

  ngAfterViewInit(): void {
    this.prettify();
  }

  

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'sb',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: '2.05',
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: '2.05'
                }
              }
            },
            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '0.75',
                },
              },
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value: '1.30',
                },
              }
            ]
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

  public onSendEmail() {
    return this.httpClient.get('http://localhost:8080/emailctrl/simpleemail').subscribe(
      (res) => {console.log("email Ok : ", res);},
      (error) => {console.log("error email : ", error);}
    );
  }

 
}
