import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private token:TokenStorageService) { }

  public sendEmailAfterPaypal(idCommand: number, totalPrice: number, username: string){
    this.httpClient.post<any>('http://localhost:8080/emailctrl/payedcommand/' + idCommand + '/' + totalPrice + '/' + username, null,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.token.getToken()
      }
    }).subscribe(
      (res) => {console.log("send email ok", res);
        this.router.navigate(['acknoledgment/' + res]);},
      (error) => {console.log("send email pb", error);}
    );
  }
  
}
