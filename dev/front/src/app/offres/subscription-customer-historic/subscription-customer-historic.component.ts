import { LoginService } from 'src/app/services/login.service';
import { SyntheseService } from 'src/app/services/synthese.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { Subscription } from 'src/app/models/subscription.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-subscription-customer-historic',
  templateUrl: './subscription-customer-historic.component.html',
  styleUrls: ['./subscription-customer-historic.component.css']
})
export class SubscriptionCustomerHistoricComponent implements OnInit {

  public username: string;
  nextSubscriptionsList: BehaviorSubject<Subscription[]>;
  activeSubscriptionsList: BehaviorSubject<Subscription[]>;
  historicSubscriptionsList: BehaviorSubject<Subscription[]>;
  historic: number = 0;
  active: number = 0;
  next: number = 0;
 

  constructor(private router: Router,
      private loginService: LoginService,
      private syntheseService: SyntheseService,
      private utilsService: UtilsService) { }

  ngOnInit() {
    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });
  
    this.syntheseService.publishHistoricSubscriptionsForAnUser(this.username);
    this.historicSubscriptionsList  = this.syntheseService.listHistoricSubscriptionsForAnUser$;
    this.syntheseService.getHistoricSubscriptionsForAnUser(this.username).subscribe(
      historicSubscriptionsForAnUserList => {
        this.historic = historicSubscriptionsForAnUserList.length;
        
      });

    this.syntheseService.publishActiveSubscriptionsForAnUser(this.username);
    this.activeSubscriptionsList  = this.syntheseService.listActiveSubscriptionsForAnUser$;
    this.syntheseService.getActiveSubscriptionsForAnUser(this.username).subscribe(
      activeSubscriptionsForAnUserList => {
        this.active = activeSubscriptionsForAnUserList.length;
        
      });

    this.syntheseService.publishNextSubscriptionsForAnUser(this.username);
    this.nextSubscriptionsList  = this.syntheseService.listNextSubscriptionsForAnUser$; 
    this.syntheseService.getNextSubscriptionsForAnUser(this.username).subscribe(
      nextSubscriptionsForAnUserList => {
        this.next = nextSubscriptionsForAnUserList.length;
        
      });
   
  }


    public convertIntoDateSubscription(pDateOfSeance) {
      return pDateOfSeance = (pDateOfSeance==null) ? "" : this.utilsService.convertIntoDateSubscriptionListing(pDateOfSeance);
    }

    public convertIntoMonetaryFormat(price: number){
      return this.utilsService.convertIntoMonetaryFormat(price);
    } 

    public extractTypeItem(rawTypeItem: string){
      return rawTypeItem.split(":")[0];
    }



}
