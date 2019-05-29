import { UtilsService } from 'src/app/services/utils.service';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { HttpClient } from '@angular/common/http';
import { CustomValidator } from 'src/app/validators/custom.validator';
import { Router } from '@angular/router';
import { runInThisContext } from 'vm';
import {MatPasswordStrengthComponent} from '@angular-material-extensions/password-strength';
import {ChangeDetectionStrategy, ViewChild, ViewEncapsulation} from '@angular/core';
import {Title} from '@angular/platform-browser';


@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html', 
  styleUrls: ['./customer-new.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class CustomerNewComponent implements OnInit {
    @ViewChild('passwordComponentWithConfirmation')
  passwordComponentWithConfirmation: MatPasswordStrengthComponent;

type="password";

  newCustomer: Customer;
  userRegistrationForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  fullname: string; 
  username: string;
  email: string;
  password: string;
  checkedAdrCopy: boolean;
  dateOfBirthday: Date;
  domesticAddress: string;
  domesticCp: string;
  domesticCity: string;
  domesticCountry: string;
  deliveryAddress: string;
  deliveryCp: string;
  deliveryCity: string;
  deliveryCountry: string;
  tel: string;
  hide: boolean;
  isNotHiddenSpinner: boolean
  

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private utilsService: UtilsService,
    private router: Router
) {
    this.createForm();
}


  ngOnInit() {
    if(this.utilsService.availableUsernames.length === 0) {
    }
    this.checkedAdrCopy = false;
    this.isNotHiddenSpinner = false;
    this.hide= true;
  }

  createForm() {
      this.userRegistrationForm = this.formBuilder.group({
          fullname: ['', [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(128)
          ]],
          username: ['', [
            Validators.required,
            Validators.minLength(1),
            CustomValidator.usernameValidator(this.utilsService.availableUsernames)
          ]],
        emailGroup: this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            confirmEmail: ['', Validators.required]
        }, { validator: CustomValidators.childrenEqual}),
        passwordGroup: this.formBuilder.group({
            password: ['', [
                Validators.required,
                Validators.pattern(regExps.password)
            ]],
            confirmPassword: ['', Validators.required]
        }, { validator: CustomValidators.childrenEqual}),
        domesticAddress: ['', [
            Validators.required
        ]],
        domesticCity: ['', [
            Validators.required
        ]],
        domesticCp: ['', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5)
        ]],
        domesticCountry: ['', [
            Validators.required
        ]],
        checkedAdr: [true],
        deliveryAddress: ['', [
            Validators.required
        ]],
        deliveryCity: ['', [
            Validators.required
        ]],
        deliveryCp: ['', [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(5)
        ]],
        deliveryCountry: ['', [
            Validators.required
        ]],
        tel: ['', [
            Validators.required,
            Validators.pattern('(?:(?:\\+|00)33|0)\\s*[1-9](?:[\\s.-]*\\d{2}){4}')
        ]],
        dateOfBirthday: ['', [
            Validators.required,
            CustomValidator.dateOfBirhdayValidator()
        ]]
      });
  }


  onCopyAdr(){
      if(!this.checkedAdrCopy){
        this.deliveryAddress = this.domesticAddress;
        this.deliveryCp = this.domesticCp;
        this.deliveryCity = this.domesticCity;
        this.deliveryCountry = this.domesticCountry;
      }
      else {
        this.deliveryAddress="";
        this.deliveryCp = "";
        this.deliveryCity = "";
        this.deliveryCountry = "";
      }
      
  }

  onCopyAdrSpace(){
    if(this.checkedAdrCopy){
      this.deliveryAddress = this.domesticAddress;
      this.deliveryCp = this.domesticCp;
      this.deliveryCity = this.domesticCity;
      this.deliveryCountry = this.domesticCountry;
    }
    else {
      this.deliveryAddress="";
      this.deliveryCp = "";
      this.deliveryCity = "";
      this.deliveryCountry = "";
    }
    
}


  onStrengthChanged(strength: number) {
    // console.log('password strength = ', strength);
  }

  onRegister(): void {
     
   
    this.isNotHiddenSpinner = true;
      this.newCustomer = new Customer(
                this.username,
                this.fullname,  
                this.password,
                this.email,
                this.tel, 
                this.dateOfBirthday, 
                this.domesticAddress,
                this.domesticCp,
                this.domesticCity,
                this.domesticCountry,
                this.deliveryAddress,
                this.deliveryCp,
                this.deliveryCity,
                this.deliveryCountry
                );

    this.customerService.createCustomer(this.newCustomer);
 }

}

