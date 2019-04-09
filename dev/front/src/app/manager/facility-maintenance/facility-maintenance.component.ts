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
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';


@Component({
  selector: 'app-facility-maintenance',
  templateUrl: './facility-maintenance.component.html',
  styleUrls: ['./facility-maintenance.component.css']
})
export class FacilityMaintenanceComponent implements OnInit {
  
  file: File;
  listFacilityCategories: BehaviorSubject<FacilityCategory[]>;
  listRooms: BehaviorSubject<Room[]>;
  facilityCategories: FacilityCategory[];
  listFacilities: BehaviorSubject<Facility[]>;
  facilities: Facility[];
  idFacility: number;
  nameFacility: string;
  costOfIntervetion: number;
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
  

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.idFacility = +this.route.snapshot.params.idFacility;
    this.managerService.publishFacilities();
    this.managerService.findFacility(this.idFacility).subscribe(facility => {
      this.idFacility = facility.idFacility;
      this.managerService.publishFacilityCategoryAssociateToFacility(this.idFacility);
      this.nameFacility = facility.nameFacility;
      
      this.managerService.getFacilityCategoryAssociateToFacility(this.idFacility).subscribe(res => {
        this.facilityCategoryAssociateToFacility = res;
        this.managerService.publishFacilityCategoryAssociateToFacility(this.idFacility);
        this.nameFacilityCategory = this.facilityCategoryAssociateToFacility.nameFacilityCategory;
      });
      
    });

    

    this.managerService.getFacilityCategories().subscribe(res => {
      this.facilityCategories = res;
      this.managerService.publishFacilityCategories();
      this.listFacilityCategories = this.managerService.listFacilityCategories$;
    });

    this.managerService.getFacilities().subscribe(res => {
      this.facilities = res;
      this.managerService.publishFacilities();
      this.listFacilities = this.managerService.listFacilities$;
    });

    this.createForm();
    this.initDatePurchaseField();
  }

  createForm(){
    this.maintenanceForm = this.formBuilder.group({

        nameFacility: ['', [
          Validators.required,
          Validators.minLength(1),
        ]],
        costOfIntervetion: '',
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
   
    //this.managerService.updateFacility(this.idFacility, this.nameFacilityCategory, this.nameRoom, this.nameFacility, this.priceSeance, this.descriptionFacility, this.imageFacility, this.priceFacility);




  }


  
}
