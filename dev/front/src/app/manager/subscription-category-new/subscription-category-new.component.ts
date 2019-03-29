import { AdminService } from '../../services/admin.service';
import { Staff } from '../../models/staff.model';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/services/customer.service';
import { OffresService } from 'src/app/services/offres.service';
import { SubscriptionCategory } from 'src/app/models/subscription-category.model'


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
            Validators.maxLength(128)
        ]],
        priceSubscription: ['', [
          Validators.required
        ]]
    });
}

  // createForm() {
  //     this.subscriptionCategoryRegistrationForm = this.formBuilder.group({
  //         fullname: ['', [
  //             Validators.required,
  //             Validators.minLength(1),
  //             Validators.maxLength(128)
  //         ]],
  //         usernameGroup: this.formBuilder.group({
  //         username: ['', [
  //           Validators.required,
  //           Validators.minLength(1),
  //         ]]
  //       }, {validator: this.checkUsername.bind(this)}),
  //       role: ['ROLE_MANAGER', [
  //           Validators.required
  //       ]]
  //     });
  // }


  onRegister(): void {
      this.newSubscriptionCategory = new SubscriptionCategory();
      this.newSubscriptionCategory.nameSubscription = this.nameSubscription;
      this.newSubscriptionCategory.nbLast = 3;
      this.newSubscriptionCategory.typeLast = "month";
      this.newSubscriptionCategory.priceSubscription = this.priceSubscription;

    this.offresService.addSubscriptionCategory(this.newSubscriptionCategory);
 }

  checkUsername(group: FormGroup){
    let username : string;
    
    username = group.get("username").value;
    const isValid = !(this.customerService.availableAuthorities.find(authoritary => authoritary.username === username))
    return isValid ? null : { checkUsername: true };
  }

}
