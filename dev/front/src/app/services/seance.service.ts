import { TimestampFacility } from 'src/app/models/timestamp-facility.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommandService } from './command.service';
import { Seance } from 'src/app/models/seance.model';
import { Command } from 'src/app/models/command.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  constructor(private commandService: CommandService,
              private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router,
              private token: TokenStorageService) { }

  public listTimestampFacilities$: BehaviorSubject<TimestampFacility[]> = new BehaviorSubject(null);

  public priceSeanceSubject: BehaviorSubject<number[]> = new BehaviorSubject(null);

  public setPriceSeanceSubject(value: number[]){
    if(value){
      this.priceSeanceSubject.next(value);
    } else {
      this.priceSeanceSubject.next(null);
    }
  }

  public isBookedTimestampSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsBookedTimestampSubject(value: boolean){
    if(value){
      this.isBookedTimestampSubject.next(value);
    } else {
      this.isBookedTimestampSubject.next(null);
    }
  }

  public isShowableFacilitiesSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsShowableFacilitiesSubject(value: boolean){
    if(value){
      this.isShowableFacilitiesSubject.next(value);
    } else {
      this.isShowableFacilitiesSubject.next(null);
    }
  }

  public isValidateSeanceSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsValidateSeanceSubject(value: boolean){
    if(value){
      this.isValidateSeanceSubject.next(value);
    } else {
      this.isValidateSeanceSubject.next(null);
    }
  }

  public seanceSubject: BehaviorSubject<Seance> = new BehaviorSubject(null);

  public setSeanceSubject(value: Seance){
    if(value){
      console.log("setSeanceSubject value", value);
      this.seanceSubject.next(value);
    } else {
      this.seanceSubject.next(null);
    }
  }

  public addSeanceToCommand(command: Command, username: string){
    // if(command == undefined){
    //   this.loginService.signOut();
    //   this.router.navigate(['/login']);
    //   return;
    // }
    this.httpClient.post<Seance>('http://localhost:8080/seancectrl/addseance/' + command.idCommand + '/' + username, null, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        (seance) =>{ 
          command.items.push(seance); 
          this.commandService.setCommandSubject(command);
          this.setSeanceSubject(seance);  
        },
        (error) => { console.log("init seance pb : ", error); }
    );
  }

  public removeSeanceFromCommand(command: Command, seance: Seance){
    this.httpClient.delete('http://localhost:8080/seancectrl/deleteseance/' + seance.idItem, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        () =>{ 
          command.items.splice(command.items.findIndex((item)=> item.idItem === seance.idItem), 1); 
          this.commandService.setCommandSubject(command); 
          console.log("reset command : ", command);
        },
        (error) => { console.log("init timestamp pb : ", error); }
    );
  }

  public addTimestampFacilityToSeance(seance: Seance, dateOfTimestamp: Date, nameFacility: string, nameFacilityCategory: string){
    
    
    this.httpClient.post<TimestampFacility>('http://localhost:8080/timestampfacilityctrl/addtimestampfacility/' + seance.idItem + '/' +
    dateOfTimestamp + '/' + nameFacility + '/' + nameFacilityCategory, null, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        (timestampFacility) =>{ 
          timestampFacility.nameFacility = nameFacility;
          timestampFacility.dateOfTimestamp = dateOfTimestamp;
          seance.timestampFacilities.push(timestampFacility);
          this.listTimestampFacilities$.next(seance.timestampFacilities);
          //console.log("seance (seance) : ", seance.timestampFacilities[0].dateOfTimestamp);
           //this.commandService.setCommandSubject(command);
          
          this.setSeanceSubject(seance);  
        },
        (error) => { console.log("init timestamp pb : ", error); }
    );
  }

  
 

  public addDateAndNbTimestamp(seance: Seance){
    this.httpClient.put<Seance>('http://localhost:8080/seancectrl/adddateandnbtimestamp/' + seance.idItem, null, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        (updatedSeance) =>{ 
          console.log("updated seance OK : ", updatedSeance);
          this.setSeanceSubject(updatedSeance);  
        },
        (error) => { console.log("updated seance pb : ", error); }
    );
  }
 
  public removeTimestampFacilityFromSeance(seance: Seance,  idTimestampFacility: number, dateOfTimestamp: Date){
    this.httpClient.delete('http://localhost:8080/timestampfacilityctrl/deletetimestampfacility/' + idTimestampFacility, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        () =>{ 
          console.log("reset timestamp OK : ");
          seance.timestampFacilities.splice(seance.timestampFacilities.findIndex((timestampFacility)=> timestampFacility.idTimestampFacility === idTimestampFacility), 1); 
           //this.commandService.setCommandSubject(command);
          this.setSeanceSubject(seance); 

          let isBookedTimestamp = false;
          for(let i=0; i< seance.timestampFacilities.length; i++){
            if(seance.timestampFacilities[i].dateOfTimestamp === dateOfTimestamp){
              isBookedTimestamp = true;
            }
          }
        console.log("this.isBookedTimestamp : ", isBookedTimestamp);
        this.setIsBookedTimestampSubject(isBookedTimestamp);
           
        },
        (error) => { console.log("init timestamp pb : ", error); }
    );
  }
}



