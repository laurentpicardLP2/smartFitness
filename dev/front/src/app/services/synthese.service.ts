import { TokenStorageService } from 'src/app/services/token-storage.service';
import { TimestampFacilityAdaptater } from 'src/app/models/timestamp-facility-adaptater.model';
import { Command } from '../models/command.model';
import { Seance } from '../models/seance.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SyntheseService {

  constructor(private httpClient: HttpClient,
              private token: TokenStorageService
              ) { }

  private listCommandsForAnUser: Command [] ;
  private listSeancesForAnUser: Seance [] ;
  private listTimestampForASeance: TimestampFacilityAdaptater [] ;

  listCommandsForAnUser$: BehaviorSubject<Command[]> = new BehaviorSubject(null);
  listSeancesForAnUser$: BehaviorSubject<Seance[]> = new BehaviorSubject(null);
  listTimestampForASeance$: BehaviorSubject<TimestampFacilityAdaptater[]> = new BehaviorSubject(null);
  
  public getCommandsForAnUser(username: string): Observable<Command[]> {
    return this.httpClient.get<Command[]>('http://localhost:8080/synthesectrl/getcommands/' + username, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  });
  }

  public getSeancesForAnUser(username: string): Observable<Seance[]> {
    return this.httpClient.get<Seance[]>('http://localhost:8080/synthesectrl/getseances/' + username, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  });
  }

  public getTimestampForASeance(idItem: number): Observable<TimestampFacilityAdaptater[]> {
    return this.httpClient.get<TimestampFacilityAdaptater[]>('http://localhost:8080/synthesectrl/gettimestampfromaseance/' + idItem, 
    {
      headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
      }
  });
  }

  public publishCommandsForAnUser(username: string) {
    this.getCommandsForAnUser(username).subscribe(
      commandsForAnUserList => {
        this.listCommandsForAnUser = commandsForAnUserList;
        this.listCommandsForAnUser$.next(this.listCommandsForAnUser);
      });
    }

    public publishSeancesForAnUser(username: string) {
      this.getSeancesForAnUser(username).subscribe(
        seancesForAnUserList => {
          this.listSeancesForAnUser = seancesForAnUserList;
          this.listSeancesForAnUser$.next(this.listSeancesForAnUser);
        });
      }
  
    public publishTimestampFor(idItem: number) {
      this.getTimestampForASeance(idItem).subscribe(
        timestampForASeanceList => {
          console.log("timestampForASeanceList : ", timestampForASeanceList);
          this.listTimestampForASeance = timestampForASeanceList;
          this.listTimestampForASeance$.next(this.listTimestampForASeance);
        });
      }

}
