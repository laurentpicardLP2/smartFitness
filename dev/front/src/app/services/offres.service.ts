import { CommandService } from 'src/app/services/command.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SubscriptionCategory } from 'src/app/models/subscription-category.model';
import { WatchCategory } from 'src/app/models/watch-category.model';
import { Subscription } from 'src/app/models/subscription.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Command } from 'src/app/models/command.model';
import { Watch } from '../models/watch.model';

@Injectable({
  providedIn: 'root'
})
export class OffresService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private token: TokenStorageService,
              private commandService: CommandService) { }

  public listNameSubscriptions: string [] = [] ;
  public listNameWatches: string [] = [] ;

  listNameSubscriptions$: BehaviorSubject<string[]> = new BehaviorSubject(null);
  listNameWatches$: BehaviorSubject<string[]> = new BehaviorSubject(null);


  public isValidDateOfStartOfSubscriptionSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsValidDateOfStartOfSubscriptionSubject(value: boolean){
    if(value){
      this.isValidDateOfStartOfSubscriptionSubject.next(value);
    } else {
      this.isValidDateOfStartOfSubscriptionSubject.next(null);
    }
  }
            
  public listSubscriptionCategories: SubscriptionCategory [] = [] ;
  public listWatchCategories: WatchCategory [] = [] ;
  
  listSubscriptionCategories$: BehaviorSubject<SubscriptionCategory[]> = new BehaviorSubject(null);
  listWatchCategories$: BehaviorSubject<WatchCategory[]> = new BehaviorSubject(null);
  
  public getSubscriptionCategories(): Observable<SubscriptionCategory[]> {
    return this.httpClient.get<SubscriptionCategory[]>('http://localhost:8080/managerctrl/getsubscriptioncategories', 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }

  public getNameSubscriptions(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:8080/managerctrl/namesubscriptionslist', 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }


  public getWatchCategories(): Observable<WatchCategory[]> {
    return this.httpClient.get<WatchCategory[]>('http://localhost:8080/managerctrl/getwatchcategories', 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }

  public getNameWatches(): Observable<string[]> {
    return this.httpClient.get<string[]>('http://localhost:8080/managerctrl/namewatcheslist', 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }



  public publishSubscriptionCategories() {
    this.getSubscriptionCategories().subscribe(
      subscriptionCategoriesList => {
        this.listSubscriptionCategories = subscriptionCategoriesList;
        this.listSubscriptionCategories$.next(this.listSubscriptionCategories);
      });
  }

  public publishNameSubscriptions() {
    this.getNameSubscriptions().subscribe(
      subscriptionsList => {
        this.listNameSubscriptions = subscriptionsList;
        this.listNameSubscriptions$.next(this.listNameSubscriptions);
      });
    }

  public publishWatchCategories() {
    this.getWatchCategories().subscribe(
      watchCategoriesList => {
        this.listWatchCategories = watchCategoriesList;
        this.listWatchCategories$.next(this.listWatchCategories);
      });
  }

  public publishNameWatches() {
    this.getNameWatches().subscribe(
      watchesList => {
        this.listNameWatches = watchesList;
        this.listNameWatches$.next(this.listNameWatches);
      });
    }

  /**
   * Cette fonction permet de trouver une entité subscriptionCategory dans la liste des subscriptionCategories grâce à son ID.
   * @param idSubscriptionCategory l'id qu'il faut rechercher dans la liste. 
   */
  public findSubscriptionCategory(idSubscriptionCategory: number): Observable<SubscriptionCategory> {
    if (idSubscriptionCategory) {
      if (!this.listSubscriptionCategories) {
        return this.getSubscriptionCategories().pipe(map(subscriptionCategories => subscriptionCategories.find(subscriptionCategory => subscriptionCategory.idSubscriptionCategory === idSubscriptionCategory)));
      }
      return of(this.listSubscriptionCategories.find(subscriptionCategory => subscriptionCategory.idSubscriptionCategory === idSubscriptionCategory));
    } else {
      return of(new SubscriptionCategory());
    }
  }


  /**
   * Cette fonction permet de trouver une entité watchCategory dans la liste des watchCategories grâce à son ID.
   * @param idWatchCategory l'id qu'il faut rechercher dans la liste. 
   */
  public findwatchCategory(idWatchCategory: number): Observable<WatchCategory> {
    if (idWatchCategory) {
      if (!this.listWatchCategories) {
        return this.getWatchCategories().pipe(map(watchCategories => watchCategories.find(watchCategory => watchCategory.idWatchCategory === idWatchCategory)));
      }
      return of(this.listWatchCategories.find(watchCategory => watchCategory.idWatchCategory === idWatchCategory));
    } else {
      return of(new WatchCategory());
    }
  }

  public addSubscriptionCategory(newSubscriptionCategory: SubscriptionCategory){
    this.httpClient.post<SubscriptionCategory>('http://localhost:8080/managerctrl/addsubscriptioncategory' , newSubscriptionCategory, 
        {
        headers: {
        "Content-Type": "application/json",
        "Authorization": this.token.getToken()
        }
      }).subscribe(
        (newSubscriptionCategory) =>{ 
          console.log("add SubscriptionCategory ok : ", newSubscriptionCategory);
          this.router.navigate(['subscription-category-listing']);
        },
        (error) => { 
          console.log("add SubscriptionCategory pb : ", error); 
          this.router.navigate(['error-page'])
        }
    );
  }
  //addwatchcategory/{nameWatch}/{priceWatch}/{descriptionWatch}/{imageWatch}
  public addWatchCategory(nameWatch: string, priceWatch: number,  descriptionWatch: string, imageWatch: string, isRouting: boolean){
    this.httpClient.post<WatchCategory>('http://localhost:8080/managerctrl/addwatchcategory/' + nameWatch + '/' + priceWatch + '/' + descriptionWatch + '/' + imageWatch  , null, 
        {
        headers: {
        "Content-Type": "application/json",
        "Authorization": this.token.getToken()
        }
      }).subscribe(
        (newWatchCategory) =>{ 
          console.log("add WatchCategory ok : ", newWatchCategory);
          if(isRouting){
            this.router.navigate(['watch-category-listing']);
          }
        },
        (error) => { 
          console.log("add WatchCategory pb : ", error); 
          this.router.navigate(['error-page'])
        }
    );
  }

    public updateSubscriptionCategory(updateSubscriptionCategory: SubscriptionCategory){
      this.httpClient.put<SubscriptionCategory>('http://localhost:8080/managerctrl/updatesubscriptioncategory' , updateSubscriptionCategory, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (updatedSubscriptionCategory) =>{ 
            console.log("update SubscriptionCategory OK : ", updatedSubscriptionCategory);
            let index = this.listSubscriptionCategories.findIndex(subscriptionCategory => subscriptionCategory.idSubscriptionCategory === updatedSubscriptionCategory.idSubscriptionCategory);
            this.listSubscriptionCategories[index].nameSubscription = updatedSubscriptionCategory.nameSubscription;
            this.listSubscriptionCategories$.next(this.listSubscriptionCategories);
            this.listNameSubscriptions = [];
            for(let i = 0; i< this.listSubscriptionCategories.length; i++){
              this.listNameSubscriptions.push(this.listSubscriptionCategories[i].nameSubscription);
            }
            this.listNameSubscriptions$.next(this.listNameSubscriptions);
            this.router.navigate(['subscription-category-listing']);
          },
          (error) => { 
            console.log("update subscriptionCategory pb : ", error); 
            this.router.navigate(['error-page']);
          }
      );
    }

    public updateWatchCategory(idWatchCategory: number, nameWatch: string, priceWatch: number,  descriptionWatch: string, imageWatch: string, isRouting: boolean){
      this.httpClient.put<WatchCategory>('http://localhost:8080/managerctrl/updatewatchcategory/' + idWatchCategory + '/' + nameWatch + '/' + priceWatch + '/' + descriptionWatch + '/' + imageWatch  , null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (updatedWatchCategory) =>{ 
            let index = this.listWatchCategories.findIndex(watchCategory => watchCategory.idWatchCategory === updatedWatchCategory.idWatchCategory);
            this.listWatchCategories[index].nameWatch = updatedWatchCategory.nameWatch;
            this.listWatchCategories$.next(this.listWatchCategories);
            this.listNameWatches = [];
            for(let i = 0; i< this.listWatchCategories.length; i++){
              this.listNameWatches.push(this.listWatchCategories[i].nameWatch);
            }
            this.listNameWatches$.next(this.listNameWatches);
            if(isRouting){
              setTimeout(() => this.router.navigate(['watch-category-listing']), 150);
            }
          },
          (error) => { 
            console.log("update watchCategory pb : ", error); 
            this.router.navigate(['error-page']);
          }
      );
    }


    public deleteSubscriptionCategory(idSubscriptionCategory: number){
      this.httpClient.delete('http://localhost:8080/managerctrl/delsubscriptioncategory/' + idSubscriptionCategory, 
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
        }
    }).subscribe(
          () =>{ console.log("suppression subscriptionCategory OK : ",idSubscriptionCategory);
              },
          (error) => console.log("suppression subscriptionCategory pb : ", error) 
      );
    }

    public deleteWatchCategory(idWatchCategory: number){
      this.httpClient.delete('http://localhost:8080/managerctrl/delwatchcategory/' + idWatchCategory, 
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
        }
    }).subscribe(
          () =>{ console.log("suppression watchCategory OK : ",idWatchCategory);
              },
          (error) => console.log("suppression watchCategory pb : ", error) 
      );
    }

    public addSubscriptionToCommand(command: Command, username: string, idSubscriptionCategory: number, dateStartOfSubscription: Date, dateEndOfSubscription: Date, nbItems: string, totalPriceCommand: number){
      this.httpClient.post<Subscription>('http://localhost:8080/offrectrl/addsubscription/' + command.idCommand + '/' + username + '/' +
        idSubscriptionCategory + '/' + dateStartOfSubscription + '/' + dateEndOfSubscription, null, 
        {
          headers: {
              "Content-Type": "application/json",
              "Authorization": this.token.getToken()
          }
        }).subscribe(
          (subscription) =>{ 
            console.log("subscription : ", subscription);
            command.items.push(subscription); 
            this.commandService.setCommandSubject(command); 
            if(nbItems==null || nbItems==undefined || nbItems=="") {
              nbItems = "0"; 
            }
            this.commandService.setNbItemsSubject((parseInt(nbItems, 10) + 1).toString());
            totalPriceCommand += subscription.price;
            //command.items[command.items.findIndex((item)=> item.idItem == subscription.idItem)].price += subscription.price;
            this.commandService.setTotalPriceCommandSubject(totalPriceCommand);
            this.commandService.setCommandSubject(command);
            this.commandService.setUpdateStatusAndPriceToCommand(command, totalPriceCommand);
            this.commandService.setListCommandItemsSubject(command.items);
            this.router.navigate(['']);
          },
          (error) => { 
            console.log("add subscription pb : ", error);
            //this.router.navigate(['error-page']);
          }
      );
    }
    public addWatchToCommand(command: Command,  idWatchCategory: number, username: string, nbItems: string, totalPriceCommand: number){
      this.httpClient.post<Watch>('http://localhost:8080/offrectrl/addwatch/' + command.idCommand + '/' + idWatchCategory + '/' + username , null, 
        {
          headers: {
              "Content-Type": "application/json",
              "Authorization": this.token.getToken()
          }
        }).subscribe(
          (watch) =>{ 
            command.items.push(watch); 
            this.commandService.setCommandSubject(command); 
            if(nbItems==null || nbItems==undefined || nbItems=="") {
              nbItems = "0"; 
            }
            this.commandService.setNbItemsSubject((parseInt(nbItems, 10) + 1).toString());
            totalPriceCommand += watch.price;
            //command.items[command.items.findIndex((item)=> item.idItem == watch.idItem)].price += watch.price;
            this.commandService.setTotalPriceCommandSubject(totalPriceCommand);
            this.commandService.setCommandSubject(command);
            this.commandService.setUpdateStatusAndPriceToCommand(command, totalPriceCommand);
            this.commandService.setListCommandItemsSubject(command.items);
            this.router.navigate(['']);
          },
          (error) => { 
            console.log("add watch pb : ", error);
            this.router.navigate(['error-page']);
          }
      );
    }

  
}
