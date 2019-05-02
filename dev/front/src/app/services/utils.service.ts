import { LoginService } from 'src/app/services/login.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Command } from '../models/command.model';
import { CommandService } from './command.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  command: Command;
  public isInit: boolean = true; // détecte qu'un signin suit un signout
  dayName = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  monthName = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']

  
  constructor(private commandService: CommandService,
              private httpClient: HttpClient,
              private router: Router,
              private token: TokenStorageService) { }

  
  //la liste des Usernames de l'application
  public availableUsernames: string[] = [];

  // La liste observable que l'on rend visible partout dans l'application
  availableUsernames$: BehaviorSubject<string[]> = new BehaviorSubject(this.availableUsernames);
  
  /**
   * La fonction getUsernames() est privée car elle n'a besoin d'être appellée que dans le service.
   */
   public getUsernames(): Observable<string[]>{
    return this.httpClient.get<string[]>('http://localhost:8080/userctrl/usernames');
  }

  /**
   * La fonction publishUsernames() est chargée une fois que l'on route vers signup.
   * Elle récupère la liste des usernames depuis la base de données et met à jour la liste et la liste observable.
   */

  public publishUsernames(){
    
    this.getUsernames().subscribe(
      usernameList => {
        this.availableUsernames = usernameList;
        this.availableUsernames$.next(this.availableUsernames);
      }
    )
  }

  findUsername (pUsername: string): Observable<string> {
    return this.getUsernames().pipe(map( usernames=> usernames.find(username => username === pUsername)));
  }

  public delCommand(){
    //this.loginService.isCommandInit = false;
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
      //console.log("this.command : ", this.command);
        if(this.command == undefined || this.command ==null){
          this.commandService.setNbItemsSubject("");
          this.router.navigate(['']);
          return;
        }
        if(this.isInit){
            this.isInit = false;
            this.httpClient.delete('http://localhost:8080/commandctrl/delcommand/' + this.command.idCommand, 
            {
            headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
            }
            }).subscribe(
              () => {
                      this.commandService.setNbItemsSubject("");
                      this.router.navigate(['/login']);
                    },
              (error) => {console.log("del command error", error);
                          this.router.navigate(['/error-page']);}
            );
        }
          });
      
    
  }

  /**
   * Convertit en [\d](*).[\d][\d] € le total de la séance lorque l'utilisateur se constitue une séance
   * @param price 
   */
  convertIntoMonetaryFormat(price: number){
    price = Math.round(price*100)/100;
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
   * et celle reçue par Angular => gestion du décalage horaire par la fonction getTimezoneOffset
   */
  public convertIntoDateTimeListing(pDateOfTimestamp: string): string{
    let splitDateOfTimestamp = pDateOfTimestamp.split("T");
    let datePart = splitDateOfTimestamp[0];
    let splitDatePart: string[] = datePart.split("-");
    let timePart = splitDateOfTimestamp[1];
    let timeZoneOffset = (new Date(parseInt(splitDatePart[0], 10),  parseInt(splitDatePart[1], 10) - 1, parseInt(splitDatePart[2], 10))).getTimezoneOffset();
    let splitTimePart = timePart.split(":");
    let date = new Date(parseInt(splitDatePart[0], 10),  parseInt(splitDatePart[1], 10) - 1, parseInt(splitDatePart[2], 10))
    let readGetTime = new Date(parseInt(splitDatePart[0], 10),  parseInt(splitDatePart[1], 10) - 1, parseInt(splitDatePart[2], 10), parseInt(splitTimePart[0],10), parseInt(splitTimePart[1],10)).getTime();
    let readDateTime = new Date(readGetTime - ((timeZoneOffset/60)*3600000 + (timeZoneOffset%60) * 60000));
    
    return  this.dayName[readDateTime.getDay()] + " " + (readDateTime.getDate() < 10 ? "0" + readDateTime.getDate().toString() : readDateTime.getDate().toString()) + ' ' + this.monthName[readDateTime.getMonth()] + ' ' + readDateTime.getFullYear() + " " 
      + ((readDateTime.getHours() < 10) ? "0" + readDateTime.getHours().toString() : readDateTime.getHours().toString()) + ':' + (readDateTime.getMinutes() < 10 ? "0" + readDateTime.getMinutes().toString() : readDateTime.getMinutes().toString());
    }

    public convertIntoFormatLastSubscription(nbLast: number, typeLast: string) {
      let strFormatResult: string;
      switch (typeLast) {
        case "Day" : strFormatResult = (nbLast > 1) ? "jours" : "jour";
              break;
        case "Week" : strFormatResult = (nbLast > 1) ? "semaines" : "semaine";
              break;
        case "Month" : strFormatResult = "mois"
              break;
        case "Year" : strFormatResult = (nbLast > 1) ? "années" : "année";
              break;
        default : strFormatResult = "";
      }
      return strFormatResult;
    }

    public convertIntoDateSubscriptionListing(pDateOfSubscription: string): string{
    
      let splitDateSubscription: string[] = pDateOfSubscription.split("-");      
      return  splitDateSubscription[2] +  '-' + splitDateSubscription[1] + '-' + splitDateSubscription[0] ;
      }

    public convertStringToDate(strDate: string): Date {
      let splitStrDate: string[] = strDate.split("-");
      
      return new Date(parseInt(splitStrDate[0], 10), parseInt(splitStrDate[1], 10) - 1, parseInt(splitStrDate[2], 10), 0, 0, 0);
    }

    public convertIntoFormatDate(rawDateOfSubscription: string): string{
    
      let splitRawDate: string[] = rawDateOfSubscription.split("-");      
      return  splitRawDate[2] +  '-' + splitRawDate[1] + '-' + splitRawDate[0] ;
      }
  
}
