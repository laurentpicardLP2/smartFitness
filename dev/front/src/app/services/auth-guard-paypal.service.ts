import { Command } from '../models/command.model';
import { CommandService } from './command.service';
import { TokenStorageService } from './token-storage.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardPaypalService {

  
  command: Command;

  constructor(private loginService: LoginService,
              private router: Router,
              private httpClient: HttpClient,
              private commandService: CommandService,
              private token: TokenStorageService) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if(this.loginService.isAuth && this.loginService.authority == 'ROLE_CUSTOMER') {
          this.commandService.commandSubject.subscribe(res => {
            this.command = res;
            if(! isNaN(this.command.idCommand)) {
              
              this.httpClient.get<boolean>('http://localhost:8080/commandctrl/getiscommandok/' + this.command.idCommand, 
              {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": this.token.getToken()
                }
              }).subscribe(
                (res) => {
                  if(res == false) {
                    
                    this.loginService.signOut();
                    this.router.navigate(['/login']);
                  }
              },
              (error) => {this.loginService.signOut();}
              ); 
            }
            
          });
          if(isNaN(this.command.idCommand)){
            
            this.loginService.signOut();
          }
          if(this.command.totalPrice === 0){
            this.router.navigate(['']);
          }
          return true;
      } else {
          
          this.router.navigate(['/login']);
      }
    }

}
