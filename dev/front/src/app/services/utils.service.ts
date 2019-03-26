import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Command } from '../models/command.model';
import { CommandService } from './command.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  command: Command;

  dayName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

  constructor(private commandService: CommandService,
              private httpClient: HttpClient,
              private router: Router,
              private token: TokenStorageService) { }

  public delCommand(){
    
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    //console.log("this.coomand : ", this.command);
    if(this.command == undefined || this.command ==null){
      this.router.navigate(['']);
      return;
    }

    this.httpClient.delete('http://localhost:8080/commandctrl/delcommand/' + this.command.idCommand, 
    {
    headers: {
    "Content-Type": "application/json",
    "Authorization": this.token.getToken()
    }
    }).subscribe(
      () => {
              this.commandService.setNbItemsSubject("");
              this.router.navigate(['']);
            },
      (error) => {console.log("del command error", error);
                  this.router.navigate(['/error-page']);}
    );
  }

  /**
   * Convertit en [\d](*).[\d][\d] € le total de la séance lorque l'utilisateur se constitue une séance
   * @param price 
   */
  convertIntoMonetaryFormat(price: number){
    let splittedPrice = price.toString().split(".");
    if(splittedPrice.length == 1) {
      return price.toString() + ".00 €";
    } else {
      if(splittedPrice[1].length ==1) {
        return price.toString() + "0 €";
      } else {
        return Math.trunc(price).toString() + "." + splittedPrice[1].substring(0, 2) + " €";
      }
    }
    
  }

  public getDateSeance(pDateOfTimestamp: Date): string{
    let dd = (pDateOfTimestamp.getDate() < 10 ) ? "0" + pDateOfTimestamp.getDate() : "" + pDateOfTimestamp.getDate();
    let mm = (pDateOfTimestamp.getMonth() + 1 < 10) ? "0" + (pDateOfTimestamp.getMonth() + 1) : "" + (pDateOfTimestamp.getMonth() + 1);
    return  dd + '/' + mm + '/' + pDateOfTimestamp.getFullYear().toString().substring(2, 4);
  }

  public getTimeSeance(pDateOfTimestamp: Date): string{
    let hh = (pDateOfTimestamp.getHours() < 10) ? "0" + pDateOfTimestamp.getHours() : "" + pDateOfTimestamp.getHours();
    let min = (pDateOfTimestamp.getMinutes() < 10) ? "0" + (pDateOfTimestamp.getMinutes()) : "" + (pDateOfTimestamp.getMinutes());
    return  hh + ':' + min;
  }

  /**
   * Met en forme la parie date (pDateOfTimestamp) présente dans chaque ligne du listing des séances pour un utilisateur
   * @param pDateOfTimestamp 
   *  ATTENTION : Il existe un décalage d'une heure (voir deux ? en GMT + 2) entre la date renvoyée par springboot
   * et celle reçue par Angular
   */
  public convertIntoDateTimeSeanceListing(pDateOfTimestamp: string): string{
    
    let splitDateOfTimestamp = pDateOfTimestamp.split("T");
    let datePart = splitDateOfTimestamp[0];
    let splitDatePart: string[] = datePart.split("-");
    let timePart = splitDateOfTimestamp[1];
    let splitTimePart = timePart.split(":");
    let hh = parseInt(splitTimePart[0],10) + 1;
    let date = new Date(parseInt(splitDatePart[0], 10),  parseInt(splitDatePart[1], 10) - 1, parseInt(splitDatePart[2], 10))
    
    return  this.dayName[date.getDay()] + " " + splitDatePart[2] + ' ' + this.monthName[date.getMonth()] + ' ' + splitDatePart[0] + " " 
      + ((hh < 10) ? "0" + hh.toString() : hh.toString()) + ':' + splitTimePart[1];
    }
  
}
