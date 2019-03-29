import { OffresService} from 'src/app/services/offres.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { SubscriptionCategory } from 'src/app/models/subscription-category.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';

@Component({
  selector: 'app-subscription-category-detail',
  templateUrl: './subscription-category-detail.component.html',
  styleUrls: ['./subscription-category-detail.component.css']
})
export class SubscriptionCategoryDetailComponent implements OnInit {

  idSubscriptionCategory: number;
  nameSubscription: string;
  nameSubscriptionInit: string;
  priceSubscription: number;
  subscriptionCategoryDetailForm: FormGroup;
  listSubscriptionCategories: BehaviorSubject<SubscriptionCategory[]>;
  subscriptionCategories: SubscriptionCategory[];
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private offresService: OffresService,
    private router: Router) { }

  ngOnInit() {
    this.idSubscriptionCategory = +this.route.snapshot.params.idSubscriptionCategory;
    this.offresService.publishSubscriptionCategories;
    this.offresService.findSubscriptionCategory(this.idSubscriptionCategory).subscribe(subscriptionCategory => {
      this.idSubscriptionCategory = subscriptionCategory.idSubscriptionCategory;
      this.nameSubscription = subscriptionCategory.nameSubscription;
      this.nameSubscriptionInit = subscriptionCategory.nameSubscription;
      this.priceSubscription = subscriptionCategory.priceSubscription;
    });
    this.createForm();
  }

  // createForm(){
  //   this.subscriptionCategoryDetailForm = this.formBuilder.group({
  //     nameSubscriptionCategoryGroup: this.formBuilder.group({
  //       nameSubscription: ['', [
  //         Validators.required,
  //         Validators.minLength(1),
  //       ]]
  //     }, {validator: this.checkNameSubscription.bind(this)}),
  //       priceSubscription: ['', ]
  //   }); 
  // }

  createForm(){
    this.subscriptionCategoryDetailForm = this.formBuilder.group({
      nameSubscription: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
    ]],
    priceSubscription: ['', [
      Validators.required
    ]]
    }); 
  }

  

  checkNameSubscription(group: FormGroup){
    let nameSubscription : string;
    
    nameSubscription = group.get("nameSubscription").value;
    const isValid = !(this.offresService.listSubscriptionCategories.find(subscriptionCategory => (subscriptionCategory.nameSubscription === nameSubscription) && nameSubscription != this.nameSubscriptionInit));
    return isValid ? null : { checkNameFacilityCategory: true };
  }

  


  public onUpdate() {
    let updateSubscription = new SubscriptionCategory();
    updateSubscription.nameSubscription = this.nameSubscription;
    updateSubscription.priceSubscription = this.priceSubscription
    this.offresService.updateSubscriptionCategory(updateSubscription);
  }

}
