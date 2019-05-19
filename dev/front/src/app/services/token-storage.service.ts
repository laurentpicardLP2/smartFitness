import { Injectable } from '@angular/core';
import { stringify } from 'querystring';


const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorageService {

  tab: string[]=[];

  constructor() {
  }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY,  token);

  }


  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

}