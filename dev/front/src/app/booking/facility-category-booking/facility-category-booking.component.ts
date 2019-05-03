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
import { SeanceService } from 'src/app/services/seance.service';
import { Seance } from 'src/app/models/seance.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-facility-category-booking',
  templateUrl: './facility-category-booking.component.html',
  styleUrls: ['./facility-category-booking.component.css']
})
export class FacilityCategoryBookingComponent implements OnInit, OnDestroy {
 // panelOpenState = false;
  dateOfTimestamp: Date;
  listFacilityCategories: BehaviorSubject<FacilityAvailableAdaptater[]>;
  command: Command;
  seance: Seance;
  nameFacility: string;
  isBookedTimestamp: boolean;
  isAvailableFacilites: boolean;
  isNotAvailableFacilities: boolean;
  isShowableFacilities: boolean = false;
  priceSeance: number[]=[];
  isSubscribed: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private httpClient: HttpClient,
    private commandService: CommandService,
    private seanceService: SeanceService,
    private loginService: LoginService,
    private ustilsService: UtilsService,
    private token: TokenStorageService
    ) { 
      
      }

  ngOnInit() {

    this.isShowableFacilities = false;

    //this.timestamp = this.route.snapshot.params['timestamp']; // contient la tranche horaire sélectionnée
    // => remplacé par un BehaviourSubject
    
    this.bookingService.timestampSubject.subscribe(res => {
      this.dateOfTimestamp = res;
      this.bookingService.publishFacilityCategories(this.dateOfTimestamp);
      this.listFacilityCategories = this.bookingService.listFacilityCategories$;
    });
    
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    this.seanceService.seanceSubject.subscribe(res => {
      this.seance = res;
    });

    this.seanceService.isBookedTimestampSubject.subscribe(res => {
      this.isBookedTimestamp = res;

      this.bookingService.isNotAvailableFacilitiesSubject.subscribe(res => {
        this.isNotAvailableFacilities = res;
  
        setTimeout(() => this.seanceService.isShowableFacilitiesSubject.subscribe(res => {
          this.isShowableFacilities = res;}) , 200);
        
        
          
        
      });
  
    });


    
    this.seanceService.priceSeanceSubject.subscribe(res => {
      this.priceSeance = res;
      //console.log("this.priceSeance : ", this.priceSeance);
    });


    this.loginService.isUserSubscribedSubject.subscribe(res => {
      this.isSubscribed = res;
    });

    // @HostListener('window:resize', ['$event'])
    //   getScreenSize(event?) {
    //     this.screenWidth = window.innerWidth;
    //   }


  }

  onBookingFacility(nameFacility: string, nameFacilityCategory: string, priceSeance: number){
    this.httpClient.get<boolean>('http://localhost:8080/commandctrl/getiscommandok/' + this.command.idCommand, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        }).subscribe(
          (res) => {
            if(res == false) {
              this.loginService.signOut();
              this.router.navigate(['/login']);
            }
            else {
              this.onBookingFacilityCheckedCommand(nameFacility, nameFacilityCategory, priceSeance);
            }
        },
          (error) => {this.loginService.signOut();}
        ); 
  }

  public onBookingFacilityCheckedCommand(nameFacility: string, nameFacilityCategory: string, priceSeance: number){
    priceSeance = (this.isSubscribed) ? Math.round((priceSeance/2)*100)/100 : Math.round((priceSeance)*100)/100;
    this.seanceService.addTimestampFacilityToSeance(this.seance, this.dateOfTimestamp, nameFacility, nameFacilityCategory, priceSeance, this.priceSeance);
  }

  public convertIntoMonetaryFormat(priceSeance: number){
    return this.ustilsService.convertIntoMonetaryFormat((this.isSubscribed) ? Math.round((priceSeance/2)*100)/100 : Math.round((priceSeance)*100)/100);
  }


  ngOnDestroy(){
    //this.bookingService.isNotAvailableFacilitiesSubject.unsubscribe();
    //this.seanceService.priceSeanceSubject.unsubscribe();
  }
  
}

