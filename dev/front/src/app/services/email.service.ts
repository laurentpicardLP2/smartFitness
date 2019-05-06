import { UtilsService } from 'src/app/services/utils.service';
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
    private token:TokenStorageService,
    private utilsService: UtilsService) { }

  public sendEmailAfterPaypal(idCommand: number, totalPrice: number, username: string){
    this.httpClient.post<string[]>('http://localhost:8080/emailctrl/payedcommand/' + idCommand + '/' + this.utilsService.convertIntoMonetaryFormat(totalPrice) + '/' + username, null,
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": this.token.getToken()
      }
    }).subscribe(
      (res) => {console.log("send email ok");
       },
      (error) => {console.log("send email pb", error);}
    );
  }
}
