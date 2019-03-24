import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Command } from 'src/app/models/command.model';
import { Item } from 'src/app/models/item.model';
import { BehaviorSubject } from 'rxjs';
import { SeanceService } from 'src/app/services/seance.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private token:TokenStorageService) { }
  
  public commandSubject: BehaviorSubject<Command> = new BehaviorSubject(null);

  public setCommandSubject(value: Command){
    if(value){
      this.commandSubject.next(value);
    } else {
      this.commandSubject.next(null);
    }
  }

  public nbItemsSubject: BehaviorSubject<string> = new BehaviorSubject(null);

  public setNbItemsSubject(value: string){
    if(value){
      this.nbItemsSubject.next(value);
    } else {
      this.nbItemsSubject.next(null);
    }
  }

  public initCommand(user: User){
    this.httpClient.post<Command>('http://localhost:8080/commandctrl/addcommand/' + user.username, null, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        (command) =>{ console.log("init command OK : ", command); this.setCommandSubject(command); this.router.navigate(['']);},
        (error) => { console.log("init command pb : ", error); this.setCommandSubject(null); this.router.navigate(['']);}
    );
    
  }

  public resetCommand(command: Command, username: string){
    this.httpClient.put<Command>('http://localhost:8080/commandctrl/resetcommand/' + command.idCommand + '/' + username, null, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        (resetedCommand) =>{ 
          console.log("reset command OK : ",resetedCommand.idCommand);
          this.setCommandSubject(resetedCommand); 
          this.setNbItemsSubject("");
        },
        (error) => { console.log("reset command pb : ", error); }
    );
  }

  public validateCommand(command: Command){
    this.httpClient.put<Command>('http://localhost:8080/commandctrl/validatecommand', command, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
    (validatedCommand) =>{ 
        console.log("validate command OK : ", validatedCommand);
        this.setCommandSubject(validatedCommand);
      },
      (error) => { console.log("validate command pb : ", error); }
    );
      
  }
}
