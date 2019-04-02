import { LoginService } from 'src/app/services/login.service';
import { SyntheseService } from 'src/app/services/synthese.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { Subscription } from 'src/app/models/subscription.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-subscription-customer-next',
  templateUrl: './subscription-customer-next.component.html',
  styleUrls: ['./subscription-customer-next.component.css']
})
export class SubscriptionCustomerNextComponent implements OnInit {

  public username: string;
  nextSubscriptionsList: BehaviorSubject<Subscription[]>;
 

  constructor(private router: Router,
      private loginService: LoginService,
      private syntheseService: SyntheseService,
      private utilsService: UtilsService) { }

  ngOnInit() {
    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });
   this.syntheseService.publishNextSubscriptionsForAnUser(this.username);
   this.nextSubscriptionsList  = this.syntheseService.listNextSubscriptionsForAnUser$; 
  }


    public convertIntoDateSubscription(pDateOfSeance) {
      return pDateOfSeance = (pDateOfSeance==null) ? "" : this.utilsService.convertIntoDateSubscriptionListing(pDateOfSeance);
    }

    convertIntoMonetaryFormat(price: number){
      return this.utilsService.convertIntoMonetaryFormat(price);
    } 


}
