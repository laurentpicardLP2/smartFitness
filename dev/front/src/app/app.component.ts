import { Authority } from 'src/app/models/authority.model';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { User } from './models/user.model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public typeRole: string = "ROLE_ANONYMOUS";
  username: string;
  password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit(){
     this.loginService.setIsUserLoggedSubject(false);
     this.loginService.authoritySubject.subscribe();
     this.loginService.setAuthoritySubject(new Authority("","ROLE_ANONYMOUS"));

    // window.localStorage.clear();
    
    this.username=window.localStorage.getItem("username");
    this.password=window.localStorage.getItem("password");


     if (this.username != null && this.password != null){
      this.loginService.signIn(new User(this.username, this.password), true);
     }

  }
}

