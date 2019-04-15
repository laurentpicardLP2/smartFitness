import { Command } from 'src/app/models/command.model';
import { CommandService } from 'src/app/services/command.service';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TimestampFacilityAdaptater } from 'src/app/models/timestamp-facility-adaptater.model';
import { Subscription } from 'src/app/models/subscription.model';
import { Seance } from '../models/seance.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SyntheseService {
  command: Command;

  constructor(private httpClient: HttpClient,
              private token: TokenStorageService,
              private commandService: CommandService,
              private router: Router
              ) { }

  private listCommandsForAnUser: Command [] ;
  private listSeancesForAnUser: Seance [] ;
  private listTimestampForASeance: TimestampFacilityAdaptater [] ;
  private listHistoricSubscriptionsForAnUser: Subscription [] = [] ;
  private listActiveSubscriptionsForAnUser: Subscription [] = [] ;
  private listNextSubscriptionsForAnUser: Subscription [] = [] ;

  listCommandsForAnUser$: BehaviorSubject<Command[]> = new BehaviorSubject(null);
  listSeancesForAnUser$: BehaviorSubject<Seance[]> = new BehaviorSubject(null);
  listTimestampForASeance$: BehaviorSubject<TimestampFacilityAdaptater[]> = new BehaviorSubject(null);
  listHistoricSubscriptionsForAnUser$: BehaviorSubject<Subscription[]> = new BehaviorSubject(null);
  listActiveSubscriptionsForAnUser$: BehaviorSubject<Subscription[]> = new BehaviorSubject(null);
  listNextSubscriptionsForAnUser$: BehaviorSubject<Subscription[]> = new BehaviorSubject(null);
  
  public getCommandsForAnUser(username: string): Observable<Command[]> {
    return this.httpClient.get<Command[]>('http://localhost:8080/synthesectrl/getcommands/' + username, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  });
  }

  public getSeancesForAnUser(username: string): Observable<Seance[]> {
    return this.httpClient.get<Seance[]>('http://localhost:8080/synthesectrl/getseances/' + username, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  });
  }

  public getHistoricSubscriptionsForAnUser(username: string): Observable<Subscription[]> {
    return this.httpClient.get<Subscription[]>('http://localhost:8080/offrectrl/gethistoricsubscriptionsforanuser/' + username, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }

  public getActiveSubscriptionsForAnUser(username: string): Observable<Subscription[]> {
    return this.httpClient.get<Subscription[]>('http://localhost:8080/offrectrl/getactivesubscriptionsforanuser/' + username, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }

  public getNextSubscriptionsForAnUser(username: string): Observable<Subscription[]> {
    return this.httpClient.get<Subscription[]>('http://localhost:8080/offrectrl/getnextsubscriptionsforanuser/' + username, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }

  /**
   * Retourne la liste des timestamp pour une seance idItem
   * @param idItem 
   */
  public getTimestampForASeance(idItem: number): Observable<TimestampFacilityAdaptater[]> {
    return this.httpClient.get<TimestampFacilityAdaptater[]>('http://localhost:8080/synthesectrl/gettimestampforaseance/' + idItem, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  });
  }

  public publishCommandsForAnUser(username: string) {
    this.getCommandsForAnUser(username).subscribe(
      commandsForAnUserList => {
        this.listCommandsForAnUser = commandsForAnUserList;
        this.listCommandsForAnUser$.next(this.listCommandsForAnUser);
      });
    }

  public publishSeancesForAnUser(username: string) {
    this.getSeancesForAnUser(username).subscribe(
      seancesForAnUserList => {
        this.listSeancesForAnUser = seancesForAnUserList;
        this.listSeancesForAnUser$.next(this.listSeancesForAnUser);
      });
    }
  
  public publishTimestampFor(idItem: number) {
    this.getTimestampForASeance(idItem).subscribe(
      timestampForASeanceList => {
        console.log("timestampForASeanceList : ", timestampForASeanceList);
        this.listTimestampForASeance = timestampForASeanceList;
        this.listTimestampForASeance$.next(this.listTimestampForASeance);
      });
    }

  public publishHistoricSubscriptionsForAnUser(username: string) {
    this.getHistoricSubscriptionsForAnUser(username).subscribe(
      historicSubscriptionsForAnUserList => {
        this.listHistoricSubscriptionsForAnUser = historicSubscriptionsForAnUserList;
        this.listHistoricSubscriptionsForAnUser$.next(this.listHistoricSubscriptionsForAnUser);
      });
  }

  public publishActiveSubscriptionsForAnUser(username: string) {
    this.getActiveSubscriptionsForAnUser(username).subscribe(
      activeSubscriptionsForAnUserList => {
        this.listActiveSubscriptionsForAnUser = activeSubscriptionsForAnUserList;
        this.listActiveSubscriptionsForAnUser$.next(this.listActiveSubscriptionsForAnUser);
      });
  }

  public publishNextSubscriptionsForAnUser(username: string) {
    this.getNextSubscriptionsForAnUser(username).subscribe(
      nextSubscriptionsForAnUserList => {
        this.listNextSubscriptionsForAnUser = nextSubscriptionsForAnUserList;
        this.listNextSubscriptionsForAnUser$.next(this.listNextSubscriptionsForAnUser);
      });
  }

  /**
   * Cette fonction permet de trouver une entité subscription dans la liste des subscription grâce à son ID.
   * @param idSubscriptionCategory l'id qu'il faut rechercher dans la liste. 
    * @param username la liste des subscriptions correspondant à username
    */
   public findHistoricSubscription(idSubscriptionForAnUser: number, username: string): Observable<Subscription> {
    if (idSubscriptionForAnUser) {
      if (!this.listHistoricSubscriptionsForAnUser) {
        return this.getHistoricSubscriptionsForAnUser(username).pipe(map(subscriptionsHistoricForAnUser => subscriptionsHistoricForAnUser.find(subscription => subscription.idItem === idSubscriptionForAnUser)));
      }
      return of(this.listHistoricSubscriptionsForAnUser.find(subscription => subscription.idItem === idSubscriptionForAnUser));
    } 
  }

   /**
   * Cette fonction permet de trouver une entité commande dans la liste des commandes grâce à son ID.
   * @param idCommand l'id qu'il faut rechercher dans la liste. 
    * 
    */
   public findCommand(idCommand: number, username: string): Observable<Command> {
    if (idCommand) {
      if (!this.listCommandsForAnUser) {
        return this.getCommandsForAnUser(username).pipe(map(commandsForAnUser => commandsForAnUser.find(command => command.idCommand === idCommand)));
      }
      return of(this.listCommandsForAnUser.find(command => command.idCommand === idCommand));
    } 
  }

/**
 * Fonction supprimant un article du panier 
 * @param idItem : identifiant de l'article à supprimer
 */
  public deleteItemFromCart(command: Command, idItem: number, nbItems: string){
    this.httpClient.delete('http://localhost:8080/synthesectrl/delitemfromcart/' + idItem, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
    () => {
      if ( parseInt(nbItems, 10) == 1){
        this.commandService.setNbItemsSubject("");
        } else {
          this.commandService.setNbItemsSubject((parseInt(nbItems, 10) - 1).toString());
        }
        command.items.splice(command.items.findIndex((item)=> item.idItem === idItem), 1); 
        this.commandService.setCommandSubject(command);

      this.router.navigate(['cart-composition']);
    },
    (error) => {console.log("error delete item from cart");}
  );
  }
  

}
