import { Router } from '@angular/router';
import { BookingService } from './booking.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { CommandService} from './command.service';
import { TokenStorageService } from './token-storage.service';
import { Authority } from 'src/app/models/authority.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isAuth: boolean;
  public authority: string;

  constructor(private httpClient: HttpClient,
              private commandService: CommandService,
              private bookingService: BookingService,
              private router: Router,
              private token: TokenStorageService) { }

  // Subject permettant de savoir à tout instant si l'utlisateur est connecté
  public isUserLoggedSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public setIsUserLoggedSubject(value: boolean){
    if(value){
      this.isAuth = true;
      this.isUserLoggedSubject.next(value);
    } else {
      this.isAuth = false;
      this.isUserLoggedSubject.next(null);
    }
  }

   // Subject permettant de connaître à tout instant le nom de l'utlisateur
  public usernameSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  public setUsernameSubject(value: string){
    if(value){
      this.usernameSubject.next(value);
    } else {
      this.usernameSubject.next(null);
    }
  }

  // Subject informant du rôle (authority) de l'utlisateur
  public authoritySubject: BehaviorSubject<Authority> = new BehaviorSubject(null);
  public setAuthoritySubject(value: Authority){
    if(value){
      this.authority = value.authority;
      this.authoritySubject.next(value);
    } else {
      this.authority = "ROLE_ANONYMOUS";
      this.authoritySubject.next(null);
    }
  }

  // variables servant à être informé du rôle de l'utilisateur connecté
  private availableAuthority: Authority ;
  public availableAuthority$: BehaviorSubject<Authority> = new BehaviorSubject(this.availableAuthority);

  /**
   * Fonction appelée lorsqu'un utilisateur (client ou staff) se connecte sur le site
   * @param user 
   */
  public signIn(user: User){

    this.attemptAuth(user.username, user.password).subscribe(
      data => {
       
        this.token.saveToken(data.token);
        console.log("data.token", data.token);
        this.publishAuthority(user);
        this.setIsUserLoggedSubject(true); 
        this.setUsernameSubject(user.username);
      },
      (error) => { console.log("login user pb : ", error); 
        this.setIsUserLoggedSubject(false);
        this.setAuthoritySubject(new Authority("","ROLE_ANONYMOUS"));
      }
    );
  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    return this.httpClient.post('http://localhost:8080/userctrl/login', credentials);
  }

  public getAuthority(username: string): Observable<Authority> {
    return this.httpClient.get<Authority>('http://localhost:8080/userctrl/authority/' + username, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  });
  }

  public publishAuthority(user) {
    this.getAuthority(user.username).subscribe(
      authority => {
        this.setAuthoritySubject(authority);
        if(authority.authority=="ROLE_CUSTOMER"){
          this.commandService.initCommand(user); 
          this.bookingService.setListCommandItemsSubject(null); 
        }       
      });
  }



  public signOut(){
    this.setIsUserLoggedSubject(false);
    this.setAuthoritySubject(new Authority("","ROLE_ANONYMOUS"));
    this.token.signOut();
    this.router.navigate[('/')];
  }

}
