import { Authority } from 'src/app/models/authority.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public typeRole: string = "ROLE_ANONYMOUS";
  constructor(private loginService: LoginService) { }

  ngOnInit(){
     this.loginService.setIsUserLoggedSubject(false);
     this.loginService.authoritySubject.subscribe();
     this.loginService.setAuthoritySubject(new Authority("","ROLE_ANONYMOUS"));
  }
}

