import { BookingService } from './../../services/booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { SeanceService } from 'src/app/services/seance.service';
import { CommandService } from 'src/app/services/command.service';
import { Command } from 'src/app/models/command.model';
import { Seance } from 'src/app/models/seance.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-seance-booking',
  templateUrl: './seance-booking.component.html',
  styleUrls: ['./seance-booking.component.css']
})
export class SeanceBookingComponent implements OnInit, OnDestroy {
  seanceBookingForm: FormGroup;
  timeOfBooking: Date;
  strTimeOfBooking: string;
  currentMinute: number;
  shownMinute: string;
  selectedSlice: string;
  currentHour: number;
  shownHour: string;
  selectedHour: string;
  strDateOfBooking: string;
  dateOfBooking: Date;
  shownYear: string;
  selectedYear: string;
  currentMonth: number;
  shownMonth: string;
  selectedMonth: string;
  currentDay: number;
  shownDay: string;
  selectedDay: string;
  selectedConcatFields: string;
  isOpen: boolean; // boolean rendant ou non disabled le bouton "Consulter" selon que l'on se situe ou sur la plage horaire 6h - 22h
  command: Command;
  username: string;
  seance: Seance;
  isOnInit: boolean = true;
  isAuth: boolean = false;
  isValidateSeance: boolean = false;
  priceSeance: number[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private bookingService: BookingService,
    private seanceService: SeanceService,
    private commandService: CommandService,
    private loginService: LoginService) {
      this.createForm();
      this.initTimeBookingField();
      this.routingInit();
      this.seanceService.setPriceSeanceSubject(this.priceSeance);
   }

  ngOnInit() {
    this.seanceService.setIsBookedTimestampSubject(false);
    this.seanceService.setIsShowableFacilitiesSubject(true);

    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
      if (this.isOnInit){
        this.seanceService.addSeanceToCommand(this.command, this.username);
        this.isOnInit = false;
      }
    });

    this.seanceService.seanceSubject.subscribe(res => {
      this.seance = res;
    });

    this.loginService.isUserLoggedSubject.subscribe(res => {
      this.isAuth = res;
    });

    this.seanceService.isValidateSeanceSubject.subscribe(res => {
      this.isValidateSeance = res;
    });

    this.seanceService.setIsValidateSeanceSubject(false);

    this.seanceService.priceSeanceSubject.subscribe(res => {
      this.priceSeance = res;
    });
    
  }

  createForm(){
    this.seanceBookingForm = this.formBuilder.group({
      dateOfBooking: ['', [
        Validators.required
    ]],
      timeOfBooking: ['', [
        Validators.required
    ]]
    });      
  }

  /**
   * Initialise le champ time selon les conditions suivantes :
   * - entre minuit et 6h ou entre 22h et minuit : fixe le champ time à 6h
   * - entre entre 6h et 22h, fixe le champ time l'heure courante +  un intervalle entre 1 et 10' pour 
   * être postionné sur la prochaine  tranche de réservation
   */
  initTimeBookingField(){
   // this.timeOfBooking = new Date();

   this.currentHour = (new Date()).getHours();
    this.setHourTime(this.currentHour); 
    
    if(this.currentHour > 5 && this.currentHour < 22){
      this.currentMinute = (new Date()).getMinutes();

      // = 1 si si la partie des minutes se situe dans l'intervalle [0-10[
      // = 2 si si la partie des minutes se situe dans l'intervalle [10-20[
      // = 3 si si la partie des minutes se situe dans l'intervalle [20-30[
      // = 4 si si la partie des minutes se situe dans l'intervalle [30-40[
      // = 5 si si la partie des minutes se situe dans l'intervalle [40-50[
      // = 6 si si la partie des minutes se situe dans l'intervalle [50-60[
      this.setMinuteTime(Math.floor(this.currentMinute / 10) + 1); 
    }
    
   this.strTimeOfBooking = this.shownHour + ":" + this.shownMinute;
  }

  /**
   * fixe la partie minute du champ time sur la prochaine dizaine à venir :
   * - digitMinute + "0" si digit < 6
   * - "00" autrement
   * @param digitMinute 
   */
  setMinuteTime(digitMinute: number){
    if(digitMinute < 6){
      this.shownMinute = digitMinute + "0";
    } else {
      this.shownMinute = "00";
      this.setHourTime(this.currentHour + 1);
    }
  }

  /**
   * fixe la partie heure du champ time à :
   * - "06" nbHour est dans l'intervalle ]22 - 6[
   * - "0" + nbHour est dans l'intervalle [6 - 9]
   * - nbHour.toString() dans l'intervalle [10 - 21]
   * @param nbHour 
   */
  setHourTime(nbHour: number){
    if(nbHour < 6 || nbHour > 21) {
      this.shownHour="06";
      this.shownMinute = "00";
    } else if(nbHour < 10) {
      this.shownHour = "0" + nbHour.toString();

    } else if(nbHour < 22) {
      this.shownHour=nbHour.toString();
    }
    this.dateOfBooking = new Date();

    if(nbHour > 21){
      this.dateOfBooking.setDate(this.dateOfBooking.getDate() + 1);
    }
    this.initDateBookingField();
  }

  /**
   * fixe l'année, le mois et le jour de la date en cours si l'heure courante < 22h, sinon 
   * l'année, le mois et le jour correspondant au lendemain
   */
  initDateBookingField(){
    this.shownYear = this.dateOfBooking.getFullYear().toString();
    this.currentMonth = this.dateOfBooking.getMonth() + 1;
    this.currentDay = this.dateOfBooking.getDate()
    
    if(this.currentMonth <10) {
      this.shownMonth = "0" + this.currentMonth.toString();
    } else{
      this.shownMonth = this.currentMonth.toString();
    }
    if(this.currentDay < 10) {
      this.shownDay = "0" + this.currentDay.toString();
    } else{
      this.shownDay = this.currentDay.toString();
    }
    
    this.strDateOfBooking = this.shownYear + "-" + this.shownMonth + "-" + this.shownDay;
  }

  routingInit(){
    this.bookingService.setTimestampSubject(this.getDateTimeFields());
    //this.router.navigate(['/seance-booking', {outlets: {'booking-router-outlet' : ['facility-category-booking']}}]);
  }

  public onChangeDateTime() {
    
    let selectedTimestamp = this.getDateTimeFields();
    
    if(selectedTimestamp.getHours()>21 || selectedTimestamp.getHours()<6 || (selectedTimestamp.getMinutes()%10 != 0) || selectedTimestamp.getTime() < new Date().getTime()){
      this.seanceService.setIsShowableFacilitiesSubject(false);
      this.seanceService.setIsBookedTimestampSubject(false);
      this.bookingService.setIsNotAvailableFacilitiesSubject(false);
      return;
    }
    else {
      this.seanceService.setIsShowableFacilitiesSubject(true);
    }

    this.bookingService.setTimestampSubject(selectedTimestamp);
    this.router.navigate(['/seance-booking', {outlets: {'facility-category-router-outlet' : ['facility-category-booking']}}]);
    let isBookedTimestamp = false;
    let dateOfTimestamp = this.getDateTimeFields();
    
      for(let i=0; i< this.seance.timestampFacilities.length; i++){
        //console.log("test égalité : ", new Date(this.seance.timestampFacilities[i].dateOfTimestamp.toString().split(".")[0]).toString() === new Date(dateOfTimestamp).toString());
        //console.log("test égalité timestampFacilities : ", new Date(this.seance.timestampFacilities[i].dateOfTimestamp.toString().split(".")[0]).toString());
        //console.log("test égalité : ", new Date(dateOfTimestamp).toString());
        //if( new Date(this.seance.timestampFacilities[i].dateOfTimestamp.toString().split(".")[0]).toString() === new Date(dateOfTimestamp).toString()){

         // console.log("test égalité (this.seance.timestampFacilities[i].dateOfTimestamp): ", this.seance.timestampFacilities[i].dateOfTimestamp);
          //console.log("test égalité (dateOfTimestamp) : ", dateOfTimestamp);
        if( this.seance.timestampFacilities[i].dateOfTimestamp.toString() === dateOfTimestamp.toString() ){
          isBookedTimestamp = true;
        }
      }
    this.seanceService.setIsBookedTimestampSubject(isBookedTimestamp);
  }

  getDateTimeFields(){
  let dateFieldsSplit = this.strDateOfBooking.split("-");
  let timeFieldsSplit = this.strTimeOfBooking.split(":");

  return new Date(parseInt(dateFieldsSplit[0], 10), parseInt(dateFieldsSplit[1], 10) -1, 
      parseInt(dateFieldsSplit[2], 10), parseInt(timeFieldsSplit[0],10), parseInt(timeFieldsSplit[1], 10)); 
  }


  ngOnDestroy(){ // à supprimer
    console.log("destroy");
    if(this.isAuth  && !this.isValidateSeance){
      //this.seanceService.removeSeanceFromCommand(this.command, this.seance);
      //this.seanceService.priceSeanceSubject.unsubscribe();
    }
  }

  
}