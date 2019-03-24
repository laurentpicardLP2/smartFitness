import { Injectable } from '@angular/core';
import { stringify } from 'querystring';


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorageService {

  tab: string[]=[];

  constructor() {
    //this.tab = new Array("1: 10", "2: 1")
    //this.tab.push("C: 9");
  }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
    //window.sessionStorage.setItem("order", this.tab.toString());
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // public getOrder(): string {
  //   return window.sessionStorage.getItem("order");
  // }
}