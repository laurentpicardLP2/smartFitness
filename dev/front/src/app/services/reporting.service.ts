import { Facility } from 'src/app/models/facility.model';
import { ManagerService } from 'src/app/services/manager.service';
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
              private managerService: ManagerService,
              private router: Router) { }

  public listDataSetBooking1: number [] = [] ;
  public listDataSetBooking2: number [] = [] ;
  public listLabelSetRentability: string [] = [];
  public listDataSetRentability: number[] = [];
  
  listDataSetBooking1$: BehaviorSubject<number[]> = new BehaviorSubject(null);
  listDataSetBooking2$: BehaviorSubject<number[]> = new BehaviorSubject(null);
  listLabelSetRentability$: BehaviorSubject<string[]> = new BehaviorSubject(null);
  listDataSetRentability$: BehaviorSubject<number[]> = new BehaviorSubject(null);

  private facilities: Facility[];
  
  
  public getDataSetBooking(period: number): Observable<number[]> {
    return this.httpClient.get<number[]>('http://localhost:8080/reportingctrl/getdatasetbooking/' + period, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
        }
      });
  }

  // public getDataSetRentability(): Observable<Array<any>> {
  //   return this.httpClient.get<Array<any>>('http://localhost:8080/reportingctrl/getdatasetrentability', 
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": this.token.getToken()
  //       }
  //     });
  // }

  public publishDataSetBooking() {
    this.getDataSetBooking(0).subscribe(
      dataSetBookingList => {
        this.listDataSetBooking2 = dataSetBookingList;
        this.listDataSetBooking2$.next(this.listDataSetBooking1);
        this.getDataSetBooking(1).subscribe(
          dataSetBookingList => {
            this.listDataSetBooking1 = dataSetBookingList;
            this.listDataSetBooking1$.next(this.listDataSetBooking2);
            this.router.navigate(['/monthly-rate-booking']);
          },
          (error) => {
            console.log("get data set booking 1 pb : ", error);
            this.router.navigate(['error-page']);
          });
      },
      (error) => {
        console.log("get data set booking 2 pb : ", error);
        this.router.navigate(['error-page']);
      });
  }

  public publishDataSetRentability() {
   
    this.managerService.getFacilities().subscribe(
      (res) => {
        this.facilities = res; 
        for(let i=0; i< this.facilities.length; i++){
          this.managerService.getBalanceSheet(this.facilities[i].idFacility).subscribe(
            (res) => {
              this.listLabelSetRentability.push(this.facilities[i].nameFacility);
              this.listDataSetRentability.push(res[0] - res [1]);
              if(i==this.facilities.length-1) {
                setTimeout(() => this.router.navigate(['balance-by-facility']), 750);
              }
            },
            (error) => console.log("publishDataSetRentability error part 2")
          )
        }
      },
      (error) => console.log("publishDataSetRentability error part 1")

    )
  }

    
}
