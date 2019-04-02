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
  historicSubscriptionsList: BehaviorSubject<Subscription[]>;
 

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
  }


    public convertIntoDateSubscription(pDateOfSeance) {
      return pDateOfSeance = (pDateOfSeance==null) ? "" : this.utilsService.convertIntoDateSubscriptionListing(pDateOfSeance);
    }

    convertIntoMonetaryFormat(price: number){
      return this.utilsService.convertIntoMonetaryFormat(price);
    } 



}
