import { OffresService} from 'src/app/services/offres.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { SubscriptionCategory } from 'src/app/models/subscription-category.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';

@Component({
  selector: 'app-subscription-customer-new',
  templateUrl: './subscription-customer-new.component.html',
  styleUrls: ['./subscription-customer-new.component.css']
})
export class SubscriptionCustomerNewComponent implements OnInit {

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

  strDateOfStartOfSubscription: string;
  dateOfStartOfSubscription: Date;
  startShownYear: string;
  startCurrentMonth: number;
  startShownMonth: string;
  startCurrentDay: number;
  startShownDay: string;
  strDateOfEndOfSubscription: string;
  dateOfEndOfSubscription: Date;
  endShownYear: string;
  endCurrentMonth: number;
  endShownMonth: string;
  endCurrentDay: number;
  endShownDay: string;


  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private offresService: OffresService,
    private router: Router) {
      this.dateOfEndOfSubscription =  new Date();
      this.initDateOfSubscriptionField();
      this.setDateOfEndOfSubscriptionField();
     }

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
      nameSubscriptionGroup: this.formBuilder.group({
        nameSubscription: ['', [
          Validators.required,
          Validators.minLength(1),
        ]]
      }, {validator: this.checkNameSubscription.bind(this)}),
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
      dateOfStartOfSubscription: ['', [
        Validators.required
      ]],
      dateOfEndOfSubscription: ['', [
        Validators.required
      ]]
    });
  }

  
  initDateOfSubscriptionField(){
    this.dateOfStartOfSubscription = new Date();
    this.startShownYear = this.dateOfStartOfSubscription.getFullYear().toString();
    this.startCurrentMonth = this.dateOfStartOfSubscription.getMonth() + 1;
    this.startCurrentDay = this.dateOfStartOfSubscription.getDate()
    
    if(this.startCurrentMonth <10) {
      this.startShownMonth = "0" + this.startCurrentMonth.toString();
    } else{
      this.startShownMonth = this.startCurrentMonth.toString();
    }
    if(this.startCurrentDay < 10) {
      this.startShownDay = "0" + this.startCurrentDay.toString();
    } else{
      this.startShownDay = this.startCurrentDay.toString();
    }
    
    this.strDateOfStartOfSubscription = this.startShownYear + "-" + this.startShownMonth + "-" + this.startShownDay;
  }

  setDateOfEndOfSubscriptionField(){
    let splittedDate = this.strDateOfStartOfSubscription.split("-");
    this.dateOfStartOfSubscription = new Date(parseInt(splittedDate[0],10), parseInt(splittedDate[1],10) -1, parseInt(splittedDate[2],10));

    this.dateOfEndOfSubscription = new Date(this.dateOfStartOfSubscription.getFullYear(), this.dateOfStartOfSubscription.getMonth(), this.dateOfStartOfSubscription.getDate());
    this.dateOfEndOfSubscription.setDate(this.dateOfEndOfSubscription.getDate() + 1);
    this.endShownYear = this.dateOfEndOfSubscription.getFullYear().toString();
    this.endCurrentMonth = this.dateOfEndOfSubscription.getMonth() + 1;
    this.endCurrentDay = this.dateOfEndOfSubscription.getDate()
    
    if(this.endCurrentMonth <10) {
      this.endShownMonth = "0" + this.endCurrentMonth.toString();
    } else{
      this.endShownMonth = this.endCurrentMonth.toString();
    }
    if(this.endCurrentDay < 10) {
      this.endShownDay = "0" + this.endCurrentDay.toString();
    } else{
      this.endShownDay = this.endCurrentDay.toString();
    }
    this.strDateOfEndOfSubscription = this.endShownYear + "-" + this.endShownMonth + "-" + this.endShownDay;
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
