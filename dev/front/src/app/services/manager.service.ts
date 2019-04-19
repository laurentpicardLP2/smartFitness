import { MaintenanceOperation } from '../models/maintenance-operation.model';
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
import { FacilityAdaptater } from '../models/facility-adaptater.model';


@Injectable({
  providedIn: 'root'
})
export class ManagerService {

      constructor(private httpClient: HttpClient,
        private router: Router,
        private token: TokenStorageService) { }

    // facilityCategorySubject permet d'afficher le facilityCategory associé à un facility lorsq'un manager accède à la page de détails d'un facility
    // public facilityCategorySubject: BehaviorSubject<FacilityCategory> = new BehaviorSubject(null);

    // public setFacilityCategorySubject(value: FacilityCategory){
    //   if(value){
    //     this.facilityCategorySubject.next(value);
    //   } else {
    //     this.facilityCategorySubject.next(null);
    //   }
    // }

    // roomSubject permet d'afficher la room associée à un facility lorsq'un manager accède à la page de détails d'un facility
    // public roomSubject: BehaviorSubject<Room> = new BehaviorSubject(null);

    // public setRoomSubject(value: Room){
    //   if(value){
    //     this.roomSubject.next(value);
    //   } else {
    //     this.roomSubject.next(null);
    //   }
    // }

  public isDataLoadedSubject: BehaviorSubject<boolean> = new BehaviorSubject(null);

  public setIsDataLoadedSubject(value: boolean){
    if(value){
      this.isDataLoadedSubject.next(value);
    } else {
      this.isDataLoadedSubject.next(null);
    }
  }


    public listFacilityCategories: FacilityCategory [] = [] ;
    public facilityCategoryAssociateToFacility = null;
    public listFacilities: Facility [] = [] ;
    public listRooms: Room [] = [] ;
    public listNameRooms: string [] = [] ;
    public listNameFacilityCategories: string [] = [] ;
    public listNameFacilities: string [] = [] ;
    public roomAssociateToFacility: Room = null;

    listFacilityCategories$: BehaviorSubject<FacilityCategory[]> = new BehaviorSubject(null);
    facilityCategoryAssociateToFacility$ = new BehaviorSubject(null);
    listFacilities$: BehaviorSubject<Facility[]> = new BehaviorSubject(null);
    listRooms$: BehaviorSubject<Room[]> = new BehaviorSubject(null);
    listNameRooms$: BehaviorSubject<string[]> = new BehaviorSubject(null);
    listNameFacilityCategories$: BehaviorSubject<string[]> = new BehaviorSubject(null);
    listNameFacilities$: BehaviorSubject<string[]> = new BehaviorSubject(null);
    roomAssociateToFacility$ = new BehaviorSubject(null);

    public isDataLoaded: boolean = false;

    public getFacilityCategories(): Observable<FacilityCategory[]> {
      return this.httpClient.get<FacilityCategory[]>('http://localhost:8080/managerctrl/getfacilitycategories', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public getNameFacilityCategories(): Observable<string[]> {
      return this.httpClient.get<string[]>('http://localhost:8080/managerctrl/namefacilitycategorieslist', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public getFacilityCategoryAssociateToFacility(idFacility: number): Observable<FacilityCategory> {
      return this.httpClient.get<FacilityCategory>('http://localhost:8080/managerctrl/getfacilitycategoryassociatetofacility/' + idFacility, 
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

    public getNameFacilities(): Observable<string[]> {
      return this.httpClient.get<string[]>('http://localhost:8080/managerctrl/namefacilitieslist', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    public getFacilitiesAdaptater(): Observable<FacilityAdaptater[]> {
      return this.httpClient.get<FacilityAdaptater[]>('http://localhost:8080/managerctrl/getfacilitiesbyname', 
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

    public getNameRooms(): Observable<string[]> {
      return this.httpClient.get<string[]>('http://localhost:8080/managerctrl/nameroomslist', 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }


    public getRoomAssociateToFacility(idFacility: number): Observable<Room> {
      return this.httpClient.get<Room>('http://localhost:8080/managerctrl/getroomassociatetofacility/' + idFacility, 
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

    public publishNameFacilityCategories() {
      this.getNameFacilityCategories().subscribe(
        facilityCategoriesList => {
          this.listNameFacilityCategories = facilityCategoriesList;
          this.listNameFacilityCategories$.next(this.listNameFacilityCategories);
        });
      }

    public publishNameFacilities() {
      this.getNameFacilities().subscribe(
        facilitiesList => {
          this.listNameFacilities = facilitiesList;
          this.listNameFacilities$.next(this.listNameFacilities);
        });
      }

    public publishFacilityCategoryAssociateToFacility(idFacility: number) {
      this.getFacilityCategoryAssociateToFacility(idFacility).subscribe(
        facilityCategory => {
          this.facilityCategoryAssociateToFacility = facilityCategory;
          this.facilityCategoryAssociateToFacility$.next(this.facilityCategoryAssociateToFacility);
        });
    }

  public publishFacilities() {
    this.getFacilities().subscribe(
      facilityList => {
        this.listFacilities = facilityList;
        this.listFacilities$.next(this.listFacilities);
        this.setIsDataLoadedSubject(true);
      });
    }

    public publishRooms() {
    this.getRooms().subscribe(
      roomsList => {
        this.listRooms = roomsList;
        this.listRooms$.next(this.listRooms);
      });
    }

    public publishNameRooms() {
      this.getNameRooms().subscribe(
        roomNamesList => {
          this.listNameRooms = roomNamesList;
          this.listNameRooms$.next(this.listNameRooms);
        });
      }

    public publishRoomAssociateToFacility(idFacility: number) {
      this.getRoomAssociateToFacility(idFacility).subscribe(
        room => {
          this.roomAssociateToFacility = room;
          this.roomAssociateToFacility$.next(this.roomAssociateToFacility);
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
  

    public addFacility(idFacilityCategory: number, idRoom: number, nameFacility: string, descriptionFacility:string, imageFacility: string, priceSeance: number, priceFacility: number, dateOfPurchase: Date){
      this.httpClient.post<Facility>('http://localhost:8080/managerctrl/addfacility/' + idFacilityCategory + '/' + idRoom + '/' + 
        nameFacility + '/' + descriptionFacility + '/' + imageFacility + '/' + priceSeance  + '/' + priceFacility + '/' + dateOfPurchase, null, 
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
  
    public addFacilityCategory(nameFacilityCategory: string){
      this.httpClient.post<FacilityCategory>('http://localhost:8080/managerctrl/addfacilitycategory/' + nameFacilityCategory , null, 
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
            let index = this.listRooms.findIndex(room => room.idRoom === idRoom);
            this.listRooms[index].nameRoom = nameRoom;
            this.listRooms$.next(this.listRooms);
            this.listNameRooms = [];
            for(let i = 0; i< this.listRooms.length; i++){
              this.listNameRooms.push(this.listRooms[i].nameRoom);
            }
            this.listNameRooms$.next(this.listNameRooms);
            this.router.navigate(['room-listing']);
          },
          (error) => { 
            console.log("update room pb : ", error); 
            this.router.navigate(['error-page']);
          }
      );
    }

    public updateFacilityCategory(idFacilityCategory:number, nameFacilityCategory: string){
      this.httpClient.put<FacilityCategory>('http://localhost:8080/managerctrl/updatefacilitycategory/' + idFacilityCategory + '/' + nameFacilityCategory, null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (updatedFacilityCategory) =>{ 
            console.log("update FacilityCategory OK : ", updatedFacilityCategory);
            let index = this.listFacilityCategories.findIndex(facilityCategory => facilityCategory.idFacilityCategory === idFacilityCategory);
            this.listFacilityCategories[index].nameFacilityCategory = nameFacilityCategory;
            this.listFacilityCategories$.next(this.listFacilityCategories);
            this.listNameFacilityCategories = [];
            for(let i = 0; i< this.listFacilityCategories.length; i++){
              this.listNameFacilityCategories.push(this.listFacilityCategories[i].nameFacilityCategory);
            }
            this.listNameFacilityCategories$.next(this.listNameFacilityCategories);
            this.router.navigate(['facility-category-listing']);
          },
          (error) => { 
            console.log("update FacilityCategory pb : ", error); 
            this.router.navigate(['error-page']);
          }
      );
    }

    public updateFacility(idFacility:number, nameFacilityCategory: string, nameRoom: string,  nameFacility: string, priceSeance: number, descriptionFacility: string, imageFacility: string, priceFacility: number){
      this.httpClient.put<Facility>('http://localhost:8080/managerctrl/updatefacility/' + idFacility + '/' + nameFacilityCategory + '/' + nameRoom + '/' + nameFacility + '/' + priceSeance+ '/' + descriptionFacility + '/' + imageFacility + '/' + priceFacility, null, 
          {
          headers: {
          "Content-Type": "application/json",
          "Authorization": this.token.getToken()
          }
        }).subscribe(
          (updatedFacility) =>{
            console.log("update Facility OK : ", updatedFacility);
            let index = this.listFacilities.findIndex(facility => facility.idFacility === idFacility);
            this.listFacilities[index].nameFacility = nameFacility;
            this.listFacilities$.next(this.listFacilities);
            this.listNameFacilities = [];
            for(let i = 0; i< this.listFacilities.length; i++){
              this.listNameFacilities.push(this.listFacilities[i].nameFacility);
            }
            this.listNameFacilities$.next(this.listNameFacilities);

            setTimeout(() => this.router.navigate(['facility-listing']), 500);
          },
          (error) => { 
            console.log("update Facility pb : ", error); 
            this.router.navigate(['error-page']);
          }
      );
    }

    public addMaintenanceOperationFacility(idFacility: number, operation: MaintenanceOperation){
      this.httpClient.post<Facility>('http://localhost:8080/managerctrl/addmaintenanceoperationtofacility/' + idFacility, operation, 
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
        }
    }).subscribe(
          (facility) =>{ console.log("init facility OK : ", facility); this.router.navigate(['facility-listing']);},
          (error) => { console.log("init facility pb : ", error);  this.router.navigate(['error-page']);}
      );
      
    }

    public deleteMaintenanceOperationFacility(idFacility: number, idMaintenanceOperation: number){
      
      this.httpClient.delete('http://localhost:8080/managerctrl/delmaintenanceoperationtofacility/' + idFacility + '/' + idMaintenanceOperation,
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
        }
    }).subscribe(
          () =>{ console.log("suppression idMaintenanceOperation OK : ",idMaintenanceOperation);
              },
          (error) => console.log("suppression idMaintenanceOperation pb : ", error) 
      );
    }

    public getBalanceSheet(idFacility: number): Observable<number[]> {
      return this.httpClient.get<number[]>('http://localhost:8080/managerctrl/getbalancesheet/' + idFacility, 
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": this.token.getToken()
          }
        });
    }

    


}