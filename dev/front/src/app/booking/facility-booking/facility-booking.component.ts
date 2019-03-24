import { Command } from 'src/app/models/command.model';
import { CommandService } from 'src/app/services/command.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { TimestampFacility } from 'src/app/models/timestamp-facility.model';
import { Seance } from 'src/app/models/seance.model';
import { SeanceService } from 'src/app/services/seance.service';
import { BookingService } from 'src/app/services/booking.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-facility-booking',
  templateUrl: './facility-booking.component.html',
  styleUrls: ['./facility-booking.component.css']
})
export class FacilityBookingComponent implements OnInit, OnDestroy {
  timestampFacilities;
  dateOfTimestamp: Date;
  seance: Seance;
  facilityName: string;
  isEmptySeance: boolean;
  isBookedTimestamp: boolean;
  nbItems: string;
  command: Command;
  priceSeance: number[];
  totalPriceSeance : number = 0;

  constructor(private bookingService: BookingService,
              private seanceService: SeanceService,
              private loginService: LoginService,
              private commandService: CommandService,
              private utilsService: UtilsService,
              private router: Router) { }

  ngOnInit() {

    this.timestampFacilities = this.seanceService.listTimestampFacilities$;

    this.seanceService.seanceSubject.subscribe(res => {
      this.seance = res;
      //console.log(" this.timestampFacilities : ",  this.timestampFacilities);
      //console.log(" this.timestampFacilities.dateOfTimestamp : ",  this.timestampFacilities[0] );
      //console.log(" this.timestampFacilities[@].dateOfTimestamp : ",  this.timestampFacilities[0].dateOfTimestamp );
      this.isEmptySeance = (this.timestampFacilities.length === 0);
    });

    this.bookingService.timestampSubject.subscribe(res => {
      this.dateOfTimestamp = res;
    });

    this.seanceService.isBookedTimestampSubject.subscribe(res => {
      this.isBookedTimestamp = res;
    });

    this.commandService.nbItemsSubject.subscribe(res => {
      this.nbItems = res;
    });

    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    this.seanceService.priceSeanceSubject.subscribe(res => {
      this.priceSeance = res;
      if(this.priceSeance.length>0) {
        this.totalPriceSeance = this.priceSeance.reduce((n1, n2) => n1 + n2);
      } else {
        this.totalPriceSeance = 0;
      }
    });
  }

  public onDeleteTimestamp(index, idTimestampFacility) {
    // console.log("onDeleteTimestamp(), id :", idTimestampFacility);
    // console.log("index :", index);
    this.seanceService.removeTimestampFacilityFromSeance(this.seance, idTimestampFacility, this.dateOfTimestamp);
    this.priceSeance.splice(index, 1);

    // implémenter un promise
    this.seanceService.setPriceSeanceSubject(this.priceSeance);
  }

  public getDateSeance(pDateOfTimestamp: Date): string{
    return  this.utilsService.getDateSeance(pDateOfTimestamp);
  }

  public getTimeSeance(pDateOfTimestamp: Date): string{
    return  this.utilsService.getTimeSeance(pDateOfTimestamp);
  }


  convertIntoMonetaryFormat(price: number){
    return this.utilsService.convertIntoMonetaryFormat(price);
  }  


  public onValidateSeance(){
    
    if(this.nbItems==null || this.nbItems==undefined || this.nbItems=="") {
      this.nbItems = "0"; 
    }
    this.seanceService.addDateAndNbTimestamp(this.seance);
    this.commandService.setNbItemsSubject((parseInt(this.nbItems, 10) + 1).toString());
    this.command.items[this.command.items.findIndex((item)=> item.idItem == this.seance.idItem)].price= this.totalPriceSeance;
    this.commandService.setCommandSubject(this.command);
    this.bookingService.setListCommandItemsSubject(this.command.items);
    this.seanceService.setIsValidateSeanceSubject(true);
    this.seanceService.setPriceSeanceSubject([]);
    this.router.navigate(['']);
  }

  ngOnDestroy(){
    //this.seanceService.priceSeanceSubject.unsubscribe();
  }

}
