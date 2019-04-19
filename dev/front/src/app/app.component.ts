import { CustomerService } from 'src/app/services/customer.service';
import { UtilsService } from 'src/app/services/utils.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { Authority } from 'src/app/models/authority.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './models/user.model';
import { HostListener } from '@angular/core';
import { Command } from 'src/app/models/command.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public typeRole: string = "ROLE_ANONYMOUS";
  username: string;
  password: string;
  commandId: number;
  lastAction: Date;

  constructor(private loginService: LoginService,
              private utilsService: UtilsService) { }

  ngOnInit(){
    this.utilsService.publishUsernames(); // sert pour s'assurer de l'unicité du username lors du signup
     this.loginService.setIsUserLoggedSubject(false);
     this.loginService.authoritySubject.subscribe();
     this.loginService.setAuthoritySubject(new Authority("","ROLE_ANONYMOUS"));

    // window.localStorage.clear();
    
    this.username=window.localStorage.getItem("username");
    this.password=window.localStorage.getItem("password");


     if (this.username != null && this.password != null){
      this.loginService.signIn(new User(this.username, this.password), true);
     }
     
       
    //  window.addEventListener('beforeunload', function (e) {

    //       // Cancel the event
    //       e.preventDefault();
    //       // Chrome requires returnValue to be set
    //       e.returnValue = '';
    //   });

      

    //   window.addEventListener('beforeunload', function() {
    //     chrome.runtime.sendMessage({ info: "Here is the info you would like to pass to background page"});
    // });

  
   


  window.addEventListener('click', () => this.loginService.resetLastAction());

  }


  @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
      this.utilsService.delCommand();
  }

  
    

  

  
  

  ngOnDestroy(){
    
  }
}

