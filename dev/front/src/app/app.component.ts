import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public typeRole: string = "ROLE_ANONYMOUS";
  commandId: number;
  lastAction: Date;

  constructor(private loginService: LoginService,
              private utilsService: UtilsService,
              private router: Router) { }

  ngOnInit(){
    this.utilsService.publishUsernames(); // sert pour s'assurer de l'unicité du username lors du signup
     this.loginService.setIsUserLoggedSubject(false);
     this.loginService.authoritySubject.subscribe();
     this.loginService.setAuthoritySubject("ROLE_ANONYMOUS");
    

  window.addEventListener('click', () => this.loginService.resetLastAction());

  }


  @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
      this.loginService.isCommandInit = false;
      this.utilsService.delCommand();
  }

  

  ngOnDestroy(){
    
  }
}

