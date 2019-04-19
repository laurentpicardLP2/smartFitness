import { OffresService} from 'src/app/services/offres.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { SubscriptionCategory } from 'src/app/models/subscription-category.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { SubscriptionValidator } from 'src/app/validators/subscription.validator';

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
  nbLast: number;
  typeLast: string;
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
      this.nbLast = subscriptionCategory.nbLast;
      this.typeLast = subscriptionCategory.typeLast;
    });
    this.createForm();
  }

  createForm() {
    this.subscriptionCategoryDetailForm = this.formBuilder.group({
      nameSubscription: ['', [
        Validators.required,
        Validators.minLength(1),
        SubscriptionValidator.nameSubscriptionDetailValidator(this.offresService.listNameSubscriptions, this.nameSubscriptionInit)
      ]],
        priceSubscription: ['', [
          Validators.required
        ]],
        nbLastGroup: this.formBuilder.group({
        nbLast: ['', [
          Validators.required,
          Validators.minLength(1),
        ]]
      }, {validator: this.checkNbLastSubscription.bind(this)}),
      typeLast: ['', [
        Validators.required
    ]],
    });
  }

  checkNameSubscription(group: FormGroup){
    let nameSubscription : string;
    
    nameSubscription = group.get("nameSubscription").value;
    const isValid = !(this.offresService.listSubscriptionCategories.find(subscriptionCategory => (subscriptionCategory.nameSubscription === nameSubscription) && nameSubscription != this.nameSubscriptionInit));
    return isValid ? null : { checkNameFacilityCategory: true };
  }

  checkNbLastSubscription(group: FormGroup) {
    let nbLast: number;

    nbLast = group.get("nbLast").value;
    const isValid = (nbLast >0 && nbLast < 11)
    return isValid ? null : { checkNbLastSubscription: true };
  }
  


  public onUpdate() {
    let updateSubscription = new SubscriptionCategory();
    updateSubscription.idSubscriptionCategory = this.idSubscriptionCategory
    updateSubscription.nameSubscription = this.nameSubscription;
    updateSubscription.priceSubscription = this.priceSubscription;
    updateSubscription.nbLast = this.nbLast;
    updateSubscription.typeLast = this.typeLast;
    this.offresService.updateSubscriptionCategory(updateSubscription);
  }

}
