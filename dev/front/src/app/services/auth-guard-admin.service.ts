import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService  implements CanActivate {

  constructor(private loginService: LoginService,
              private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.loginService.isAuth &&this.loginService.authority == 'ROLE_ADMIN') {
        return true;
    } else {
        this.router.navigate(['/login']);
    }
  }
}

