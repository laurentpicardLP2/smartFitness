import { CommandService } from 'src/app/services/command.service';
import { LoginService } from 'src/app/services/login.service';
import { Command } from 'src/app/models/command.model';
import { UtilsService } from 'src/app/services/utils.service';
import { OffresService} from 'src/app/services/offres.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { SubscriptionCategory } from 'src/app/models/subscription-category.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';

@Component({
  selector: 'app-subscription-customer-new',
  templateUrl: './subscription-customer-new.component.html',
  styleUrls: ['./subscription-customer-new.component.css']
})
export class SubscriptionCustomerNewComponent implements OnInit {

  idSubscriptionCategory: number;
  nbLastSubscription: number;
  typeLastSubscription: string;
  nameSubscription: string;
  priceSubscription: number;
  nbLast: number;
  typeLast: string;
  subscriptionForm: FormGroup;
  listSubscriptionCategories: BehaviorSubject<SubscriptionCategory[]>;
  subscriptionCategories: SubscriptionCategory[];
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  isValidDateOfStartOfSubscription: boolean;
  strDateOfStartOfSubscription: string;
  dateStartOfSubscription: Date;
  startShownYear: string;
  startCurrentMonth: number;
  startShownMonth: string;
  startCurrentDay: number;
  startShownDay: string;
  strDateOfEndOfSubscription: string;
  dateEndOfSubscription: Date;
  endShownYear: string;
  endCurrentMonth: number;
  endShownMonth: string;
  endCurrentDay: number;
  endShownDay: string;
  username: string;
  command: Command;
  nbItems: string;
  totalPriceCommand : number;


  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commandService: CommandService,
    private loginService: LoginService,
    private offresService: OffresService,
    private utilsService: UtilsService,
    private router: Router) {
      this.nbLastSubscription = +this.route.snapshot.params.nbLastSubscription;
      this.typeLastSubscription = this.route.snapshot.params.typeLastSubscription;
      this.offresService.isValidDateOfStartOfSubscriptionSubject.subscribe(res => {
        this.isValidDateOfStartOfSubscription = res;
      });
      this.dateEndOfSubscription =  new Date();
      this.initDateOfSubscriptionField();
      this.setDateOfEndOfSubscriptionField();
     }

  ngOnInit() {
    this.idSubscriptionCategory = +this.route.snapshot.params.idSubscriptionCategory;
    this.offresService.publishSubscriptionCategories;
    this.offresService.findSubscriptionCategory(this.idSubscriptionCategory).subscribe(subscriptionCategory => {
      this.idSubscriptionCategory = subscriptionCategory.idSubscriptionCategory;
      this.nameSubscription = subscriptionCategory.nameSubscription;
      this.priceSubscription = subscriptionCategory.priceSubscription;
      this.nbLast = subscriptionCategory.nbLast;
      this.typeLast = subscriptionCategory.typeLast;
    });

    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    this.commandService.nbItemsSubject.subscribe(res => {
      this.nbItems = res;
    });

    this.commandService.totalPriceCommandSubject.subscribe(res => {
      this.totalPriceCommand = res;
    });

    this.createForm();
  }

  createForm() {
    this.subscriptionForm = this.formBuilder.group({
        nameSubscription: ['', [
          Validators.required,
          Validators.minLength(1),
        ]],
        priceSubscription: ['', [
          Validators.required
        ]],
        typeAndNbLastSubscription: [this.nbLast + " " + this.utilsService.convertIntoFormatLastSubscription(this.nbLast, this.typeLast), [
          Validators.required,
          Validators.minLength(1),
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
    this.dateStartOfSubscription = new Date();
    this.startShownYear = this.dateStartOfSubscription.getFullYear().toString();
    this.startCurrentMonth = this.dateStartOfSubscription.getMonth() + 1;
    this.startCurrentDay = this.dateStartOfSubscription.getDate()
    
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
    this.dateStartOfSubscription = new Date(parseInt(splittedDate[0],10), parseInt(splittedDate[1],10) -1, parseInt(splittedDate[2],10));
    if(this.dateStartOfSubscription.toString() == "Invalid Date"){
      this.offresService.setIsValidDateOfStartOfSubscriptionSubject(false);
      return;
    }
    this.offresService.setIsValidDateOfStartOfSubscriptionSubject(true);
    this.getDateOfEndOfSubscription()
    
    this.endShownYear = this.dateEndOfSubscription.getFullYear().toString();
    this.endCurrentMonth = this.dateEndOfSubscription.getMonth() + 1;
    this.endCurrentDay = this.dateEndOfSubscription.getDate()
    
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

  getDateOfEndOfSubscription(){
      switch (this.typeLastSubscription) {
        case "Day" : 
          this.dateEndOfSubscription = new Date(this.dateStartOfSubscription.getFullYear(), this.dateStartOfSubscription.getMonth(), this.dateStartOfSubscription.getDate() + (this.nbLastSubscription - 1));
          break;
        case "Week" : 
          this.dateEndOfSubscription = new Date(this.dateStartOfSubscription.getFullYear(), this.dateStartOfSubscription.getMonth(), this.dateStartOfSubscription.getDate() + ((this.nbLastSubscription * 7) -1));
          break;
        case "Month" :
          this.dateEndOfSubscription = new Date(this.dateStartOfSubscription.getFullYear(), this.dateStartOfSubscription.getMonth() + this.nbLastSubscription, this.dateStartOfSubscription.getDate());
          this.dateEndOfSubscription.setDate(this.dateEndOfSubscription.getDate()-1) ;
          break;
        case "Year" :
          this.dateEndOfSubscription = new Date(this.dateStartOfSubscription.getFullYear() + this.nbLastSubscription, this.dateStartOfSubscription.getMonth() , this.dateStartOfSubscription.getDate());
          this.dateEndOfSubscription.setDate(this.dateEndOfSubscription.getDate()-1) ;
          break;
        default: 
         this.dateEndOfSubscription = this.dateStartOfSubscription;
      }
  }

  public onSubscribe() {
    this.offresService.addSubscriptionToCommand(this.command, this.username, this.idSubscriptionCategory, this.dateStartOfSubscription, this.dateEndOfSubscription, this.nbItems, this.totalPriceCommand);
  }


}
