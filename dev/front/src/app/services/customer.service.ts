import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from 'src/app/models/customer.model';
import { Authority } from 'src/app/models/authority.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(private httpClient: HttpClient,
              private router: Router) { 

  }

  //la liste des Authorities de l'application
  public availableAuthorities: Authority[] = [];

  // La liste observable que l'on rend visible partout dans l'application
  availableAuthorities$: BehaviorSubject<Authority[]> = new BehaviorSubject(this.availableAuthorities);
  
  /**
   * La fonction getAuthorities() est privée car elle n'a besoin d'être appellée que dans le service.
   */
   private getAuthorities(): Observable<Authority[]>{
    return this.httpClient.get<Authority[]>('http://localhost:8080/userctrl/authorities');
  }

  /**
   * La fonction publishAuthorities() est chargée une fois que l'on route vers signup.
   * Elle récupère la liste des usernames depuis la base de données et met à jour la liste et la liste observable.
   */

  public publishAuthorities(){
    console.log("publishAuthorities");
    this.getAuthorities().subscribe(
      authorityList => {
        this.availableAuthorities = authorityList;
        this.availableAuthorities$.next(this.availableAuthorities);
      }
    )
  }

  findUsername (username: string): Observable<Authority> {
    return this.getAuthorities().pipe(map( authorities=> authorities.find(authority => authority.username === username)));
  }
  
   /**
   * Fonction de création d'un nouveau customer.
   * Elle met à jour notre liste des customers et notre liste observable.
   * @param newCustomer le nouveau customer à créer
   */
  public createCustomer(newCustomer: Customer) {
    this.httpClient.post<Customer>('http://localhost:8080/userctrl/addcustomer', newCustomer).subscribe(
      ()=> console.log("ok"), 
      (error) => console.log("ko")
    );
  }

  public register(newCustomer: Customer){
    this.httpClient.post<Customer>('http://localhost:8080/userctrl/newcustomer', newCustomer).subscribe(
        (newUsers) =>{ console.log("création user OK : ", newUsers); this.router.navigate(['']);},
        (error) => console.log("création user pb : ", error) 
    );
  }


}
