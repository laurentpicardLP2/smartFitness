import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Command } from 'src/app/models/command.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacilityAvailableAdaptater } from 'src/app/models/facility-available-adaptater.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Item } from 'src/app/models/item.model';

 
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient,
              private token:TokenStorageService) {   }

  // Liste des catégories d'équipements
  private listFacilityCategories: FacilityAvailableAdaptater [] ;

  // La liste observable que l'on rend visible partout dans l'application
  listFacilityCategories$: BehaviorSubject<FacilityAvailableAdaptater[]> = new BehaviorSubject(this.listFacilityCategories);


  public isNotAvailableFacilitiesSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsNotAvailableFacilitiesSubject(value: boolean){
    if(value){
      this.isNotAvailableFacilitiesSubject.next(value);
    } else {
      this.isNotAvailableFacilitiesSubject.next(null);
    }
  }

  public listCommandItemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject(null);

  public setListCommandItemsSubject(value: Item[]){
    if(value){
      this.listCommandItemsSubject.next(value);
    } else {
      this.listCommandItemsSubject.next(null);
    }
  }
  

  /**
   * La fonction getFacilityCategories retourne une liste d'observables contenant la liste des catégories d'équipements.
   */
  public getFacilityCategories(timestamp: Date): Observable<FacilityAvailableAdaptater[]> {
   
    return this.httpClient.get<FacilityAvailableAdaptater[]>('http://localhost:8080/facilitycategoryctrl/getfacilitycategoriesavailable/' + timestamp, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  });
  }

  
  /** La fonction publishFacilityCategories() est chargée et réactualisée lorsque l'utilisateur affiche 
   * la liste des équipements pour une tranche horaire donnée.
  * 
  */
 public publishFacilityCategories(timestamp: Date) {
  this.getFacilityCategories(timestamp).subscribe(
    facilityCategoriesList => {
      this.listFacilityCategories = facilityCategoriesList;
      this.listFacilityCategories$.next(this.listFacilityCategories);
      this.setIsNotAvailableFacilitiesSubject(this.listFacilityCategories.every(facilityAvailableAdaptater => facilityAvailableAdaptater.quantityAvailable === 0));
    });
}

public timestampSubject: BehaviorSubject<Date> = new BehaviorSubject(null);

public  setTimestampSubject(value: Date){
    if(value){
      this.timestampSubject.next(value);
    } else {
      this.timestampSubject.next(null);
    }
  }


  
}
