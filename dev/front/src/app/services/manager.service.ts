import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from './login.service';
import { Facility } from 'src/app/models/facility.model';

import { Injectable } from '@angular/core';
import { FacilityCategory } from 'src/app/models/facility-category.model';
import { Room } from 'src/app/models/room.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
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

    /**
   * Cette fonction permet de trouver une entité room dans la liste des rooms grâce à son ID.
   * @param idRoom l'id qu'il faut rechercher dans la liste. 
   */
  public findRoom(idRoom: number): Observable<Room> {
    if (idRoom) {
      
      if (!this.listRooms) {
        return this.getRooms().pipe(map(rooms => rooms.find(room => room.idRoom === idRoom)));
      }
      return of(this.listRooms.find(room => room.idRoom === idRoom));
    } else {
      return of(new Room());
    }
  }

  /**
   * Cette fonction permet de trouver une entité facilityCategory dans la liste des facilityCategories grâce à son ID.
   * @param idFacilityCategory l'id qu'il faut rechercher dans la liste. 
   */
  public findFacilityCategory(idFacilityCategory: number): Observable<FacilityCategory> {
    if (idFacilityCategory) {
      if (!this.listFacilityCategories) {
        return this.getFacilityCategories().pipe(map(facilityCategories => facilityCategories.find(facilityCategory => facilityCategory.idFacilityCategory === idFacilityCategory)));
      }
      return of(this.listFacilityCategories.find(facilityCategory => facilityCategory.idFacilityCategory === idFacilityCategory));
    } else {
      return of(new FacilityCategory());
    }
  }

  /**
   * Cette fonction permet de trouver une entité facility dans la liste des facilities grâce à son ID.
   * @param idFacility l'id qu'il faut rechercher dans la liste. 
   */
  public findFacility(idFacility: number): Observable<Facility> {
    if (idFacility) {
      if (!this.listFacilities) {
        return this.getFacilities().pipe(map(facilities => facilities.find(facility => facility.idFacility === idFacility)));
      }
      return of(this.listFacilities.find(facility => facility.idFacility === idFacility));
    } else {
      return of(new Facility());
    }
  }
  

    public addFacility(idFacilityCategory: number, idRoom: number, nameFacility: string, descriptionFacility:string, imageFacility: string, priceFacility: number){

      this.httpClient.post<Facility>('http://localhost:8080/managerctrl/addfacility/' + idFacilityCategory + '/' + idRoom + '/' + 
        nameFacility + '/' + descriptionFacility + '/' + imageFacility + '/' + priceFacility, null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (addedFacility) =>{ 
            if(imageFacility == undefined) {
              this.router.navigate(['facility-listing']);
            }
          },
          (error) => { 
            console.log("add Facility pb : ", error);
            this.router.navigate(['error-page']);
          }
      );
    }


    public addImage(data, username, password, fromForm: string){
      this.httpClient.post(
        'http://localhost:8080/managerctrl/upload', data).subscribe(() => {
          window.localStorage.setItem("username", username);
          window.localStorage.setItem("password", password);
          window.localStorage.setItem("fromForm", fromForm);
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
            this.router.navigate(['room-listing']);
          },
          (error) => { 
            console.log("add room pb : ", error); 
            this.router.navigate(['error-page']);
          }
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
            this.router.navigate(['facility-category-listing']);
          },
          (error) => { 
            console.log("add FacilityCategory pb : ", error); 
            this.router.navigate(['error-page'])
          }
      );
    }

    public updateRoom(idRoom:number, nameRoom: string, capacityRoom: number){
      this.httpClient.put<Room>('http://localhost:8080/managerctrl/updateroom/' + idRoom + '/' + nameRoom + '/' + capacityRoom, null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (updatedRoom) =>{ 
            console.log("update Room OK : ", updatedRoom);
            this.router.navigate(['room-listing']);
          },
          (error) => { 
            console.log("update room pb : ", error); 
            this.router.navigate(['error-page']);
          }
      );
    }

    public updateFacilityCategory(idFacilityCategory:number, nameFacilityCategory: string, priceFacilityCategory: number){
      console.log(idFacilityCategory);
      console.log(idFacilityCategory);
      console.log(idFacilityCategory);
      this.httpClient.put<FacilityCategory>('http://localhost:8080/managerctrl/updatefacilitycategory/' + idFacilityCategory + '/' + nameFacilityCategory + '/' + priceFacilityCategory, null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (updatedFacilityCategory) =>{ 
            console.log("update FacilityCategory OK : ", updatedFacilityCategory);
            this.router.navigate(['facility-category-listing']);
          },
          (error) => { 
            console.log("update FacilityCategory pb : ", error); 
            this.router.navigate(['error-page']);
          }
      );
    }

    public updateFacility(idFacility:number, nameFacility: string, priceSeance: number){
      this.httpClient.put<Facility>('http://localhost:8080/managerctrl/updatefacility/' + idFacility + '/' + nameFacility + '/' + priceSeance, null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (updatedFacility) =>{ 
            console.log("update Facility OK : ", updatedFacility);
            this.router.navigate(['facility-listing']);
          },
          (error) => { 
            console.log("update Facility pb : ", error); 
            this.router.navigate(['error-page']);
          }
      );
    }


}