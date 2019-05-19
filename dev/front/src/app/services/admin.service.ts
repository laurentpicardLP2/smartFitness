import { UtilsService } from 'src/app/services/utils.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from './login.service';
import { Staff } from 'src/app/models/staff.model';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private token: TokenStorageService,
              private utilsService: UtilsService) {}

  public listStaff: Staff [] = [] ;

  listStaff$: BehaviorSubject<Staff[]> = new BehaviorSubject(null);

  public getStaff(): Observable<Staff[]> {
    return this.httpClient.get<Staff[]>('http://localhost:8080/adminctrl/getstaff', 
      {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "Authorization": this.token.getToken()
        }
      });
  }

  public publishStaff() {
    this.getStaff().subscribe(
      staffList => {
        this.listStaff = staffList;
        this.listStaff$.next(this.listStaff);
      });
    }

  /**
   * Cette fonction permet de trouver une entité staff dans la liste des staff grâce à son username.
   * @param username l'id qu'il faut rechercher dans la liste. 
   */
  public findStaff(username: string): Observable<Staff> {
    if (username) {
      
      if (!this.listStaff) {
        return this.getStaff().pipe(map(staffList => staffList.find(staff => staff.username === username)));
      }
      return of(this.listStaff.find(staff => staff.username === username));
    } else {
      return of(new Staff("","","","","","",""));
    }
  }



  public register(newStaff: Staff, role: string){
    this.httpClient.post<Staff>('http://localhost:8080/adminctrl/newstaff/' + role, newStaff, 
    {
      headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        (staff) =>{ 
                    this.utilsService.availableUsernames.push(newStaff.username);
                    this.utilsService.availableUsernames$.next(this.utilsService.availableUsernames);
                  },
        (error) => console.log("création staff pb : ", error) 
    );
  }

  public update(updateStaff: Staff, role: string){
    this.httpClient.put<Staff>('http://localhost:8080/adminctrl/updatestaff/' + role, updateStaff, 
    {
      headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        (staff) =>{ 
                    let index = this.listStaff.findIndex(staff => staff.username === updateStaff.username);
                    this.listStaff[index] = updateStaff;
                    this.listStaff$.next(this.listStaff);                  
                    this.router.navigate(['/staff-listing']);},
        (error) => console.log("création staff pb : ", error) 
    );
  }

  public delete(username: string){
    this.httpClient.delete('http://localhost:8080/adminctrl/deletestaff/' + username, 
    {
      headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*',
          "Authorization": this.token.getToken()
      }
  }).subscribe(
        () =>{ 
                this.listStaff.slice(this.listStaff.findIndex(staff => staff.username === username), 1);
                this.listStaff$.next(this.listStaff);
                this.utilsService.publishUsernames();
            },
        (error) => console.log("suppression staff pb : ", error) 
    );
  }
}
