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
  command: Command;
  watchCategory: WatchCategory;
  username: string;
  nbItems: string;
  totalPriceCommand : number;
  
 
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
     
    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    this.commandService.nbItemsSubject.subscribe(res => {
      this.nbItems = res;
    });
     
     this.offresService.publishWatchCategories();
    this.watchCategoryList  = this.offresService.listWatchCategories$;
 
    this.commandService.totalPriceCommandSubject.subscribe(res => {
      this.totalPriceCommand = res;
    });
 
   }
 
   
   onOrder(idWatchCategory: number){
     this.offresService.addWatchToCommand(this.command,  idWatchCategory, this.username, this.nbItems, this.totalPriceCommand);
   }
 
   public convertIntoMonetaryFormat(priceWatch: number){
     return this.ustilsService.convertIntoMonetaryFormat(Math.round((priceWatch)*100)/100);
   }
 

}
