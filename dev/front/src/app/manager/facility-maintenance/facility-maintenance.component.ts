import { UtilsService } from 'src/app/services/utils.service';
import { MaintenanceOperation } from 'src/app/models/maintenance-operation.model';
import { ManagerService } from 'src/app/services/manager.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { FacilityCategory } from 'src/app/models/facility-category.model';
import { Facility } from 'src/app/models/facility.model';
import { Room } from 'src/app/models/room.model';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-facility-maintenance',
  templateUrl: './facility-maintenance.component.html',
  styleUrls: ['./facility-maintenance.component.css']
})
export class FacilityMaintenanceComponent implements OnInit {
  
  file: File;
  listRooms: BehaviorSubject<Room[]>;
  listFacilities: BehaviorSubject<Facility[]>;
  facilities: Facility[];
  facility: Facility;
  idFacility: number;
  nameFacility: string;
  costOfIntervention: number;
  descOfIntervention: string;
  typeOfIntervention: string;
  dateOfIntervention: Date;
  strDateOfIntervention: string;
  shownYear: string;
  currentMonth: number;
  shownMonth: string;
  currentDay: number;
  shownDay: string;
  maintenanceForm: FormGroup;
  facilityCategoryAssociateToFacility: FacilityCategory;
  nameFacilityCategory: string = "";
  maintenanceOperations: MaintenanceOperation [];
  maintenanceOperation: MaintenanceOperation;
  balanceSheet: number[] = [];
  revenue: number = 100;
  expenditure: number;
  strExpenditure: string;
  strRevenue: string;
  strBalanceWidth: string;
  balanceRes: number;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private loginService: LoginService,
    private utilsService: UtilsService,
    private router: Router) { }

  ngOnInit() {
    this.facility = new Facility();
    this.idFacility = +this.route.snapshot.params.idFacility;
    this.managerService.publishFacilities();
    this.managerService.findFacility(this.idFacility).subscribe(facility => {
      this.facility.idFacility = facility.idFacility;
      this.facility.nameFacility = facility.nameFacility;
      this.facility.priceSeance = facility.priceSeance
      this.facility.priceFacility = facility.priceFacility;
      this.facility.dateOfPurchase = facility.dateOfPurchase;
      this.facility.descriptionFacility = facility.descriptionFacility
      this.facility.imageFacility = facility.imageFacility;
      this.facility.maintenanceOperations = facility.maintenanceOperations;

      this.idFacility = facility.idFacility;
      this.managerService.publishFacilityCategoryAssociateToFacility(this.idFacility);
      this.nameFacility = facility.nameFacility;
      this.maintenanceOperations = facility.maintenanceOperations;
      
      this.managerService.getFacilityCategoryAssociateToFacility(this.idFacility).subscribe(res => {
        this.facilityCategoryAssociateToFacility = res;
        this.managerService.publishFacilityCategoryAssociateToFacility(this.idFacility);
        this.nameFacilityCategory = this.facilityCategoryAssociateToFacility.nameFacilityCategory;
      });
      
    });

    this.managerService.getFacilities().subscribe(res => {
      this.facilities = res;
      this.managerService.publishFacilities();
      this.listFacilities = this.managerService.listFacilities$;
    });

    this.managerService.getBalanceSheet(this.idFacility).subscribe(res => {
        this.revenue = res[0];
        this.expenditure = res[1];
           this.balanceSheet = res;
           this.strRevenue=((this.revenue/(this.expenditure + this.revenue + 1) * 375)).toString() + "px";
           this.strExpenditure=((this.expenditure/(this.expenditure + this.revenue + 1) * 375)).toString() + "px";
     
        this.strBalanceWidth = ((Math.abs(this.revenue - this.expenditure)/(this.expenditure + this.revenue + 1) * 375)).toString() + "px";
        this.balanceRes = this.revenue - this.expenditure;
           
      },
      (error) => {console.log("error " , error)}
    );


    this.createForm();
    this.initDatePurchaseField();
    
  }

  createForm(){
    this.maintenanceForm = this.formBuilder.group({

        nameFacility: ['', [
          Validators.required,
          Validators.minLength(1),
        ]],
        costOfIntervention: '',
        dateOfIntervention: '',
        descOfIntervention: '',
        typeOfIntervention: '',
      nameFacilityCategory: ['', [
        Validators.required
      ]]
    }); 
  }


  initDatePurchaseField(){
    this.dateOfIntervention = new Date();
    this.shownYear = this.dateOfIntervention.getFullYear().toString();
    this.currentMonth = this.dateOfIntervention.getMonth() + 1;
    this.currentDay = this.dateOfIntervention.getDate()
    
    if(this.currentMonth <10) {
      this.shownMonth = "0" + this.currentMonth.toString();
    } else{
      this.shownMonth = this.currentMonth.toString();
    }
    if(this.currentDay < 10) {
      this.shownDay = "0" + this.currentDay.toString();
    } else{
      this.shownDay = this.currentDay.toString();
    }
    
    this.strDateOfIntervention = this.shownYear + "-" + this.shownMonth + "-" + this.shownDay;
  }


  public onValidate() {
    this.maintenanceOperation = new MaintenanceOperation();
    this.maintenanceOperation.costOfIntervention = this.costOfIntervention;
    this.maintenanceOperation.dateOfIntervention = this.utilsService.convertStringToDate(this.strDateOfIntervention);
    this.maintenanceOperation.descOfIntervention = this.descOfIntervention;
    this.maintenanceOperation.typeOfIntervention = this.typeOfIntervention;
   
    this.managerService.addMaintenanceOperationFacility(this.idFacility, this.maintenanceOperation);

  }

  public onDelete(idMaintenanceOperation: number){
    this.managerService.deleteMaintenanceOperationFacility(this.idFacility, idMaintenanceOperation);
  }

  public convertIntoFormatDate(rawDate: string){
    return this.utilsService.convertIntoFormatDate(rawDate.split("T")[0]);
  }

  public convertIntoMonetaryFormat(price: number){
    return this.utilsService.convertIntoMonetaryFormat(price);
  }

  getColor(): string{
    return (this.revenue > this.expenditure ? "green" : "red");
  }

  
}
