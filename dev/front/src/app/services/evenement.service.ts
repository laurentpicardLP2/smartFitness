import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Evenement } from 'src/app/models/evenement.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

    constructor(private httpClient: HttpClient,
        private router: Router,
        private token: TokenStorageService) { }

    public listEvenements: Evenement [] = [] ;

    listEvenements$: BehaviorSubject<Evenement[]> = new BehaviorSubject(null);

    public getEvenements(): Observable<Evenement[]> {
        return this.httpClient.get<Evenement[]>('http://localhost:8080/evenementctrl/getevenementinprogress', 
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": this.token.getToken()
            }
          });
      }

    public getEvenementInSlotTime(): Observable<Evenement[]> {
      return this.httpClient.get<Evenement[]>('http://localhost:8080/evenementctrl/getevenementinslottime', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }
    
    public getIdMaxEvt(): Observable<number> {
        return this.httpClient.get<number>('http://localhost:8080/evenementctrl/getidmaxevenement', 
        {
            headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
            }
        });
    }

    public getEvenementById(idEvt: number): Observable<Evenement> {
      return this.httpClient.get<Evenement>('http://localhost:8080/evenementctrl/getevenementbyid/' + idEvt, 
      {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
      });
  }


    public publishEvenements() {
        this.getEvenements().subscribe(
          evenementsList => {
            this.listEvenements = evenementsList;
            this.listEvenements$.next(this.listEvenements);
          });
      }

    
    public addEvenement(evenement: Evenement, isRouting: boolean){
    this.httpClient.post<Evenement>('http://localhost:8080/evenementctrl/addevenement', evenement, 
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
        }
    }).subscribe(
        (evt) =>{ console.log("init evt OK : ", evt); 
        if(isRouting){
            this.router.navigate(['evenement-listing']);
        }
    },
        (error) => { console.log("init evt pb : ", error);  this.router.navigate(['error-page']);}
    );
    
    }

    public updateEvenement(evenement: Evenement, isRouting: boolean){
      this.httpClient.put<Evenement>('http://localhost:8080/evenementctrl/updateevenement', evenement, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (updatedEvenement) =>{
            console.log("update Evenement OK : ", updatedEvenement);
            let index = this.listEvenements.findIndex(evt => evt.idEvt === evenement.idEvt);
            this.listEvenements[index] = updatedEvenement;
            this.listEvenements$.next(this.listEvenements);
            if(isRouting){
              setTimeout(() => this.router.navigate(['evenement-listing']), 150);
            }
          },
          (error) => { 
            console.log("update evenement pb : ", error); 
            this.router.navigate(['error-page']);
          }
      );
    }

    public deleteEvenement(idEvt: number){
    
    this.httpClient.delete('http://localhost:8080/evenementctrl/delevenement/' + idEvt,
    {
        headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
        }
    }).subscribe(
        () =>{ console.log("suppression idEvt OK : ",idEvt);
                this.listEvenements.slice(this.listEvenements.findIndex(evenement => evenement.idEvt === idEvt), 1);
                this.listEvenements$.next(this.listEvenements);
            },
        (error) => console.log("suppression idEvt pb : ", error) 
    );
    }

    public findEvenement(idEvt: number): Observable<Evenement> {
        if (idEvt) {
          
          if (!this.listEvenements)
            return this.getEvenements().pipe(map(evenements => evenements.find(evenement => evenement.idEvt === idEvt)));
          }
          return of(this.listEvenements.find(evenement => evenement.idEvt === idEvt));
        } 
  
  
}
