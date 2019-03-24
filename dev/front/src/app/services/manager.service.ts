import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from './login.service';
import { Facility } from 'src/app/models/facility.model';

import { Injectable } from '@angular/core';
import { FacilityCategory } from 'src/app/models/facility-category.model';
import { Room } from 'src/app/models/room.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

      constructor(private httpClient: HttpClient,
        private router: Router,
        private token: TokenStorageService) { }

    public listFacilityCategories: FacilityCategory [] = [] ;
    public listFacilities: Facility [] = [] ;
    public listRooms: Room [] = [] ;

    listFacilityCategories$: BehaviorSubject<FacilityCategory[]> = new BehaviorSubject(null);
    listFacilities$: BehaviorSubject<Facility[]> = new BehaviorSubject(null);
    listRooms$: BehaviorSubject<Room[]> = new BehaviorSubject(null);

    public getFacilityCategories(): Observable<FacilityCategory[]> {
      return this.httpClient.get<FacilityCategory[]>('http://localhost:8080/managerctrl/getfacilitycategories', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public getFacilities(): Observable<Facility[]> {
      return this.httpClient.get<Facility[]>('http://localhost:8080/managerctrl/getfacilities', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public getRooms(): Observable<Room[]> {
      return this.httpClient.get<Room[]>('http://localhost:8080/managerctrl/getrooms', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public publishFacilityCategories() {
      this.getFacilityCategories().subscribe(
        facilityCategoriesList => {
          this.listFacilityCategories = facilityCategoriesList;
          this.listFacilityCategories$.next(this.listFacilityCategories);
        });
    }

  public publishFacilities() {
    this.getFacilities().subscribe(
      facilityList => {
        this.listFacilities = facilityList;
        this.listFacilities$.next(this.listFacilities);
      });
    }

    public publishRooms() {
    this.getRooms().subscribe(
      roomsList => {
        this.listRooms = roomsList;
        this.listRooms$.next(this.listRooms);
      });
    }

    public addFacility(idFacilityCategory: number, idRoom: number, nameFacility: string, descriptionFacility:string, imageFacility: string){

      this.httpClient.post<Facility>('http://localhost:8080/managerctrl/addfacility/' + idFacilityCategory + '/' + idRoom + '/' + 
        nameFacility + '/' + descriptionFacility + '/' + imageFacility, null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (addedFacility) =>{ 
            console.log("add Facility OK : ", addedFacility);
            this.router.navigate(['facility-new'])
          },
          (error) => { console.log("add Facility pb : ", error); }
      );
    }


    public addImage(data, idFacilityCategory: number, idRoom: number, nameFacility: string, descriptionFacility:string, imageFacility: string){
      this.httpClient.post(
        'http://localhost:8080/managerctrl/upload', data).subscribe(value => {
          this.addFacility(idFacilityCategory, idRoom, nameFacility, descriptionFacility, imageFacility);
        },
          (error) => {console.log("pb upload fichier ", error);}
        );
      }

  
    public addRoom(nameRoom: string, capacityRoom: number){
      this.httpClient.post<Room>('http://localhost:8080/managerctrl/addroom/' + nameRoom + '/' + capacityRoom, null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (addedRoom) =>{ 
            console.log("add Room OK : ", addedRoom);
            this.router.navigate(['room-new'])
          },
          (error) => { console.log("add room pb : ", error); }
      );
    }
  
    public addFacilityCategory(nameFacilityCategory: string, priceFacilityCategory: number){
      this.httpClient.post<FacilityCategory>('http://localhost:8080/managerctrl/addfacilitycategory/' + nameFacilityCategory + '/' + priceFacilityCategory, null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (addedFacilityCategory) =>{ 
            console.log("add FacilityCategory OK : ", addedFacilityCategory);
            this.router.navigate(['facility-category-new'])
          },
          (error) => { console.log("add FacilityCategory pb : ", error); }
      );
    }


}