import { TokenStorageService } from 'src/app/services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SubscriptionCategory } from 'src/app/models/subscription-category.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffresService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private token: TokenStorageService) { }



  public listSubscriptionCategories: SubscriptionCategory [] = [] ;

  listSubscriptionCategories$: BehaviorSubject<SubscriptionCategory[]> = new BehaviorSubject(null);

  public getSubscriptionCategories(): Observable<SubscriptionCategory[]> {
    return this.httpClient.get<SubscriptionCategory[]>('http://localhost:8080/managerctrl/getsubscriptioncategories', 
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
  

 
  
  public addSubscriptionCategory(newSubscriptionCategory: SubscriptionCategory){
    this.httpClient.post<SubscriptionCategory>('http://localhost:8080/managerctrl/addsubscriptioncategory' , newSubscriptionCategory, 
        {
        headers: {
        "Content-Type": "application/json",
        "Authorization": this.token.getToken()
        }
      }).subscribe(
        (newSubscriptionCategory) =>{ 
          console.log("add SubscriptionCategory pb : ", newSubscriptionCategory);
          this.router.navigate(['subscription-category-listing']);
        },
        (error) => { 
          console.log("add SubscriptionCategory pb : ", error); 
          this.router.navigate(['error-page'])
        }
    );
  }e

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
            //this.router.navigate(['facility-category-listing']);
          },
          (error) => { 
            console.log("update subscriptionCategory pb : ", error); 
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
  
}
