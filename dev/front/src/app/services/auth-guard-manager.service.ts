import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardManagerService  implements CanActivate {
  constructor(private loginService: LoginService,
    private router: Router) {}

canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.loginService.isAuth && (this.loginService.authority == 'ROLE_MANAGER' || this.loginService.authority == 'ROLE_ADMIN') && !window.localStorage.getItem("token")) {
      return true;
    } else if(window.localStorage.getItem("token")) {
      
        const decodedToken = jwt_decode(window.localStorage.getItem("token"));
        this.loginService.setIsUserLoggedSubject(true);
        this.loginService.setUsernameSubject(decodedToken.username);
        this.loginService.setAuthoritySubject(decodedToken.authority);
        this.loginService.setFullnameSubject(decodedToken.fullname);
       
          this.loginService.setAuthoritySubject(decodedToken.authority);
          let fromForm = window.localStorage.getItem("fromForm") ;
          window.localStorage.clear();
          if(fromForm == "facilityForm") {
            setTimeout(() => this.router.navigate(['/facility-listing']), 650);
          } else if(fromForm == "evenementForm"){
            setTimeout(() => this.router.navigate(['/evenement-listing']), 650);
          }
         else if(fromForm == "productRefForm"){
          setTimeout(() => this.router.navigate(['/product-ref-listing']), 650);
          }          

    }
    else {
      this.router.navigate(['/login']);
    }
  }

}


