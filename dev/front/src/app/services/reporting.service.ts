import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private httpClient: HttpClient,
              private token: TokenStorageService,
              private router: Router) { }

  public listDataSet1: number [] = [] ;
  public listDataSet2: number [] = [] ;
  listDataSet1$: BehaviorSubject<number[]> = new BehaviorSubject(null);
  listDataSet2$: BehaviorSubject<number[]> = new BehaviorSubject(null);
  
  public getDataSet(period: number): Observable<number[]> {
    return this.httpClient.get<number[]>('http://localhost:8080/reportingctrl/getdataset/' + period, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }

  public publishDataSet() {
    this.getDataSet(0).subscribe(
      dataSetList => {
        this.listDataSet2 = dataSetList;
        this.listDataSet2$.next(this.listDataSet1);
        this.getDataSet(1).subscribe(
          dataSetList => {
            this.listDataSet1 = dataSetList;
            this.listDataSet1$.next(this.listDataSet2);
            this.router.navigate(['/monthly-rate-booking']);
          },
          (error) => {
            console.log("get data set 1 pb : ", error);
            this.router.navigate(['error-page']);
          });
      },
      (error) => {
        console.log("get data set 2 pb : ", error);
        this.router.navigate(['error-page']);
      });
  }

    
}
