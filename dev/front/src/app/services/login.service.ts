import { MatSnackBar } from '@angular/material/snack-bar';
import { OffresService } from 'src/app/services/offres.service';
import { ManagerService } from 'src/app/services/manager.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Command } from 'src/app/models/command.model';
import { Router } from '@angular/router';
import { BookingService } from './booking.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { CommandService} from './command.service';
import { TokenStorageService } from './token-storage.service';
import { Authority } from 'src/app/models/authority.model';
import { ProductService } from './product.service';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isAuth: boolean;
  public authority: string;
  public command: Command;
  public lastAction: Date;
  public timer: number = 0;
  public isCommandInit: boolean = false; // nécessaire dans le cas où il y  a plusieurs onglets de smartFitness ouvert

  constructor(private httpClient: HttpClient,
              private commandService: CommandService,
              private managerService: ManagerService,
              private offresServices: OffresService,
              private productService: ProductService,
              private router: Router,
              private token: TokenStorageService,
              private utilsService: UtilsService,
              private snackBar: MatSnackBar) { }

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

  // Subject permettant de savoir si l'utlisateur a un abonnement en cours
  public isUserSubscribedSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);
  public setIsUserSubscribedSubject(value: boolean){
    if(value){
      this.isUserSubscribedSubject.next(value);
    } else {
      this.isUserSubscribedSubject.next(null);
    }
  }
   

   // Subject permettant de connaître à tout instant l'identifiant de l'utlisateur
  public usernameSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  public setUsernameSubject(value: string){
    if(value){
      this.usernameSubject.next(value);
    } else {
      this.usernameSubject.next(null);
    }
  }

   // Subject permettant de connaître à tout instant le nom de l'utlisateur
   public fullnameSubject: BehaviorSubject<string> = new BehaviorSubject(null);
   public setFullnameSubject(value: string){
     if(value){
       this.fullnameSubject.next(value);
     } else {
       this.fullnameSubject.next(null);
     }
   }


  /**
   * l'existence de ce subject a pour but de récupérer l'instance active du user
   * pour permettre d'affecter un nouveau panier au user après la validation du paiment. (utilisé dans acknoledgment component)
   */
  public userSubject: BehaviorSubject<User> = new BehaviorSubject(null);
  public setUserSubject(value: User){
    if(value){
      this.userSubject.next(value);
    } else {
      this.userSubject.next(null);
    }
  }


  //Subject informant du rôle (authority) de l'utlisateur
  public authoritySubject: BehaviorSubject<string> = new BehaviorSubject(null);
  public setAuthoritySubject(value: string){
    if(value){
      this.authority = value;
      this.authoritySubject.next(value);
      
       if(this.authority == "ROLE_ADMIN" || this.authority == "ROLE_MANAGER"){
         this.managerService.publishNameRooms();
         this.managerService.publishNameFacilityCategories();
         this.managerService.publishNameFacilities();
         this.offresServices.publishNameSubscriptions();
         this.offresServices.publishNameWatches();
         this.productService.publishNameProductCategories();
         this.productService.publishNameProductRefs();
         this.productService.publishProductCategories();
         this.productService.publishProductRefs();
       }
       if(this.authority == "ROLE_CUSTOMER"){
          this.productService.publishFavoriteProducts();
          this.productService.publishProducts();
       }
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
  public signIn(user: User, bReload: boolean){
      if(this.authority == "ROLE_CUSTOMER"){
        this.utilsService.delCommand();
      }
    this.attemptAuth(user.username, user.password).subscribe(
      data => {
       
        this.token.saveToken(data.token);

        this.httpClient.get<boolean>('http://localhost:8080/commandctrl/detectsessionopen/' + user.username, 
        {
          headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin':'*',
              "Authorization": this.token.getToken()
          }
      }).subscribe(
        (detectedCommandZero) => {

          if(detectedCommandZero == false){this.signInAfterCheckIsOnlySession(user, bReload); }
          else{
                this.snackBar.open("Une session est déjà ouverte, veuillez la clôturer ou attendre 10 minutes", "Ok", {
                  duration: 10000
                });
                this.signOut();
                this.router.navigate(['/login']);}
        },
        (error) => {
          console.log("deletedCommandZero pb : ", error);
        }
      );
    

        
      },
      (error) => { console.log("login user pb : ", error); 
      this.snackBar.open("L'identifiant ou le mot de passe sont incorrects", "Ok", {
        duration: 10000
      });
        this.setIsUserLoggedSubject(false);
        this.setAuthoritySubject("ROLE_ANONYMOUS");
      }
    );
  }

  resetLastAction() {
    this.lastAction = new Date();
  }

  public autoclose(){
    this.timer +=1; 
    let diff = new Date().getTime() - this.lastAction.getTime();
    if(diff > 600000){
      this.utilsService.delCommand();
      this.signOut();
      this.router.navigate[('/login')];
      window.location.reload();
      this.lastAction = null;
    } else {setTimeout(() => this.autoclose(), 10000);}
    
  }

  signInAfterCheckIsOnlySession(user: User, bReload: boolean){
    this.publishAuthority(user);
    this.setIsUserLoggedSubject(true); 
    this.setUsernameSubject(user.username);
              
      this.getUserInfos(user.username).subscribe(
        (res) => {
            this.setFullnameSubject(res[0].split(" ")[0]);
            this.router.navigate(['']);

        },
        (error) => { }
      );
        
  }

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    return this.httpClient.post('http://localhost:8080/userctrl/login', null, {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        "Authorization": "Basic " + btoa(ussername + ":" + password)
      }
    });
  }

  // public getAuthority(username: string): Observable<Authority> {
    
  //   return this.httpClient.get<Authority>('http://localhost:8080/userctrl/authority/' + username, 
  //   {
  //     headers: {
  //         "Content-Type": "application/json",
  //         'Access-Control-Allow-Origin':'*',
  //         "Authorization": this.token.getToken()
  //     }
  // });
  // }

  getUserInfos(username: string): Observable<string []>{
    return this.httpClient.get<string []>('http://localhost:8080/userctrl/getuserinfos/' + username, 
    {
      headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "Authorization": this.token.getToken()
      }
  });
  }

  getUserSubscribed(username: string, selectedDate: string): Observable<boolean>{
    return this.httpClient.get<boolean>('http://localhost:8080/userctrl/getisusernamesubscribedselecteddate/' + username + '/' + selectedDate, 
    {
      headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "Authorization": this.token.getToken()
      }
  });
  }

  checkUserIsSubscribed(username: string): Observable<boolean>{
    return this.httpClient.get<boolean>('http://localhost:8080/offrectrl/getisusernamesubscribed/' + username, 
    {
      headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "Authorization": this.token.getToken()
      }
  });
  }


  public publishAuthority(user: User) {
      const decodedToken = jwt_decode(this.token.getToken());
      const authority = decodedToken.authority;

        this.setAuthoritySubject(authority);
        this.setUserSubject(user);

        if(authority=="ROLE_CUSTOMER" && this.isCommandInit == false){
          this.isCommandInit = true;
           this.commandService.initCommand(user.username, true); 
           this.commandService.setListCommandItemsSubject(null);
           this.lastAction = new Date();
            setTimeout(() => this.commandService.commandSubject.subscribe(
                (res) => {
                  this.httpClient.get<boolean>('http://localhost:8080/commandctrl/getiscommandok/' + res.idCommand, 
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "Authorization": this.token.getToken()
                    }
                  }).subscribe(
                    (res) => {
                      if(res == false) {
                        this.commandService.initCommand(user.username, true);
                      }
                  });
                }
           ), 400);
           
          if(this.timer === 0) {
            setTimeout(() => this.autoclose(), 2000);
          }
    
        }
  }



  public signOut(){
    this.isCommandInit = false;
    this.setIsUserLoggedSubject(false);
    this.setAuthoritySubject("ROLE_ANONYMOUS");
    this.token.signOut();
    this.router.navigate[('/login')];
  }


  public deleteCommandZero(username: string){
    this.httpClient.delete('http://localhost:8080/commandctrl/cleancommand/' + username, 
        {
          headers: {
              "Content-Type": "application/json",
              'Access-Control-Allow-Origin':'*',
              "Authorization": this.token.getToken()
          }
      }).subscribe(
        (deletedCommandZero) => {
        },
        (error) => {
          console.log("deletedCommandZero pb : ", error);
        }
      );
    }

}
