import { LoginService } from 'src/app/services/login.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { FacilityAvailableAdaptater } from '../../models/facility-available-adaptater.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CommandService } from 'src/app/services/command.service';
import { Command } from 'src/app/models/command.model';
import { OffresService } from 'src/app/services/offres.service';
import { WatchCategory } from 'src/app/models/watch-category.model';

@Component({
  selector: 'app-watch-customer-proposition',
  templateUrl: './watch-customer-proposition.component.html',
  styleUrls: ['./watch-customer-proposition.component.css']
})
export class WatchCustomerPropositionComponent implements OnInit {

  watchCategoryList: BehaviorSubject<WatchCategory[]>; 
  
   dateOfTimestamp: Date;
   listFacilityCategories: BehaviorSubject<FacilityAvailableAdaptater[]>;
   command: Command;
   watchCategory: WatchCategory;
   nameFacility: string;
   isBookedTimestamp: boolean;
   isAvailableFacilites: boolean;
   isNotAvailableFacilities: boolean;
   isShowableFacilities: boolean;
   priceSeance: number[]=[];
  
 
   constructor(
     private route: ActivatedRoute,
     private router: Router,
     private httpClient: HttpClient,
     private commandService: CommandService,
     private loginService: LoginService,
     private ustilsService: UtilsService,
     private offresService: OffresService
     ) { 
       
       }
 
   ngOnInit() {
     
     this.commandService.commandSubject.subscribe(res => {
       this.command = res;
     });
 

     this.offresService.publishWatchCategories();
    this.watchCategoryList  = this.offresService.listWatchCategories$;
 
 
   }
 
   onBookingWatch(nameFacility: string, nameFacilityCategory: string, priceSeance: number){
     //priceSeance = (this.isSubscribed) ? Math.round((priceSeance/2)*100)/100 : Math.round((priceSeance)*100)/100;
     //this.seanceService.addTimestampFacilityToSeance(this.seance, this.dateOfTimestamp, nameFacility, nameFacilityCategory, priceSeance, this.priceSeance);
    
   }
 
   public convertIntoMonetaryFormat(priceWatch: number){
     return this.ustilsService.convertIntoMonetaryFormat(Math.round((priceWatch)*100)/100);
   }
 

}
