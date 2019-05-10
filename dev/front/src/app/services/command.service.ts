import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Command } from 'src/app/models/command.model';
import { Item } from 'src/app/models/item.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemPaypalAdaptater } from 'src/app/models/item-paypal-adaptater.model';

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

  public listCommandItemsSubject: BehaviorSubject<Item[]> = new BehaviorSubject(null);

  public setListCommandItemsSubject(value: Item[]){
    if(value){
      this.listCommandItemsSubject.next(value);
    } else {
      this.listCommandItemsSubject.next(null);
    }
  }

  public totalPriceCommandSubject: BehaviorSubject<number> = new BehaviorSubject(null);

  public setTotalPriceCommandSubject(value: number){
    if(value){
      this.totalPriceCommandSubject.next(value);
    } else {
      this.totalPriceCommandSubject.next(null);
    }
  }

  public initCommand(username: string, isRouting: boolean){
    this.httpClient.post<Command>('http://localhost:8080/commandctrl/addcommand/' + username, null, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        (command) =>{ console.log("init command OK : ", command); 
                    this.setCommandSubject(command);
                      this.setTotalPriceCommandSubject(0);
                      if (isRouting) {
                        this.router.navigate(['']);
                      }
                      this.setNbItemsSubject("");},
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
          this.setTotalPriceCommandSubject(0);
          this.setListCommandItemsSubject(null);
          this.router.navigate(['']);
        },
        (error) => { console.log("reset command pb : ", error); }
    );
  }

  public validateCommand(command: Command, finalStep: boolean, totalPrice: number){
    command.totalPrice = totalPrice;
    this.setCommandSubject(command);
    this.httpClient.put<Command>('http://localhost:8080/commandctrl/validatecommand', command, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
    (validatedCommand) =>{ 
        if(finalStep){
          this.setCommandSubject(validatedCommand);
          this.router.navigate(['paypal']);
        }
      },
      (error) => { console.log("validate command pb : ", error); 
                    this.router.navigate(['error-page']);
                  }
    );
      
  }

  public updateCommand(command: Command){
    this.httpClient.put<Command>('http://localhost:8080/commandctrl/updatecommand', command, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
    (updatedCommand) =>{ 
        console.log("validate command OK : ", updatedCommand);
      },
      (error) => { console.log("validate command pb : ", error); 
                    this.router.navigate(['error-page']);
                  }
    );
      
  }


  public getItemsPaypalAdaptater(idCommand: number): Observable<ItemPaypalAdaptater[]> {
    return this.httpClient.get<ItemPaypalAdaptater[]>('http://localhost:8080/commandctrl/getitemsbycommand/' + idCommand, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }

  public setUpdateStatusAndPriceToCommand(command: Command, totalPriceCommand: number) {
    this.httpClient.put<Command>('http://localhost:8080/commandctrl/setupdatestatusandpricetocommand/' + command.idCommand + '/' + totalPriceCommand, null, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        (updatedOneCommand) =>{ 
          console.log("set 1 to command OK : ",updatedOneCommand);
          this.setCommandSubject(updatedOneCommand);
        },
        (error) => { console.log("reset command pb : ", error); }
    );
  }

}
