import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { LoginService } from 'src/app/services/login.service';
import {TokenStorageService} from 'src/app/services/token-storage.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  username: string;
  password: string; 

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private token: TokenStorageService
) {
    this.createForm();
}


  ngOnInit() {
    
  }

  createForm() {
      this.userLoginForm = this.formBuilder.group({
        username: ['', [
              Validators.required
          ]],
        password: ['', [
            Validators.required
          ]]
      });
  }

  onSignIn(): void {
    this.token.signOut();
    this.loginService.signIn(new User(this.username, this.password));
 }

}
