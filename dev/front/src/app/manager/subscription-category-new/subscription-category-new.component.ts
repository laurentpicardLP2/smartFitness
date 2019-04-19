import { AdminService } from '../../services/admin.service';
import { Staff } from '../../models/staff.model';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/services/customer.service';
import { OffresService } from 'src/app/services/offres.service';
import { SubscriptionCategory } from 'src/app/models/subscription-category.model'
import { SubscriptionValidator } from 'src/app/validators/subscription.validator';


@Component({
  selector: 'app-subscription-category-new',
  templateUrl: './subscription-category-new.component.html',
  styleUrls: ['./subscription-category-new.component.css']
})
export class SubscriptionCategoryNewComponent implements OnInit {

  
  newSubscriptionCategory: SubscriptionCategory;
  subscriptionCategoryRegistrationForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  nameSubscription: string;
  priceSubscription: number;
  typeLast: string;
  nbLast: number;

  constructor(
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private customerService: CustomerService,
    private httpClient: HttpClient,
    private offresService: OffresService
) {
    this.createForm();
}


  ngOnInit() {
    this.offresService.publishSubscriptionCategories();
  }


  createForm() {
    this.subscriptionCategoryRegistrationForm = this.formBuilder.group({
      nameSubscription: ['', [
        Validators.required,
        Validators.minLength(1),
        SubscriptionValidator.nameSubscriptionValidator(this.offresService.listNameSubscriptions)
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


  checkNbLastSubscription(group: FormGroup) {
    let nbLast: number;

    nbLast = group.get("nbLast").value;
    const isValid = (nbLast >0 && nbLast < 11)
    return isValid ? null : { checkNbLastSubscription: true };
}


  onRegister(): void {
      this.newSubscriptionCategory = new SubscriptionCategory();
      this.newSubscriptionCategory.nameSubscription = this.nameSubscription;
      this.newSubscriptionCategory.nbLast = this.nbLast;
      this.newSubscriptionCategory.typeLast = this.typeLast;
      this.newSubscriptionCategory.priceSubscription = this.priceSubscription;

    this.offresService.addSubscriptionCategory(this.newSubscriptionCategory);
 }

}
