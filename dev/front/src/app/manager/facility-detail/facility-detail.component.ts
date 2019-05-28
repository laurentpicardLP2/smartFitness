import { ManagerService } from 'src/app/services/manager.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { FileInformation } from '../file-information';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { FacilityCategory } from 'src/app/models/facility-category.model';
import { Facility } from 'src/app/models/facility.model';
import { Room } from 'src/app/models/room.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html',
  styleUrls: ['./facility-detail.component.css']
})
export class FacilityDetailComponent implements OnInit {
  file: File;
  fileInformation: FileInformation;
  listFacilityCategories: BehaviorSubject<FacilityCategory[]>;
  listRooms: BehaviorSubject<Room[]>;
  facilityCategories: FacilityCategory[];
  listFacilities: BehaviorSubject<Facility[]>;
  facilities: Facility[];
  rooms: Room[];
  idFacility: number;
  nameFacility: string;
  nameFacilityInit: string;
  priceSeance: number;
  priceFacility: number;
  dateOfPurchase: Date;
  descriptionFacility: string;
  imageFacility: string = '';
  facilityForm: FormGroup;
  bChangeImage: boolean = false;
  facilityCategoryAssociateToFacility: FacilityCategory;
  nameFacilityCategory: string = "";
  roomAssociateToFacility: Room;
  nameRoom: string ="";
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  @ViewChild('fileInput')
  fileInput: ElementRef;

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
      this.nameFacilityInit = facility.nameFacility;
      this.priceFacility = facility.priceFacility;
      this.dateOfPurchase = facility.dateOfPurchase;
      this.priceSeance = facility.priceSeance;
      this.descriptionFacility = facility.descriptionFacility;
      this.imageFacility = facility.imageFacility;
      this.managerService.getFacilityCategoryAssociateToFacility(this.idFacility).subscribe(res => {
        this.facilityCategoryAssociateToFacility = res;
        this.managerService.publishFacilityCategoryAssociateToFacility(this.idFacility);
        this.nameFacilityCategory = this.facilityCategoryAssociateToFacility.nameFacilityCategory;
      });
      this.managerService.getRoomAssociateToFacility(this.idFacility).subscribe(res => {
        this.roomAssociateToFacility = res;
        this.managerService.publishRoomAssociateToFacility(this.idFacility);
        this.nameRoom = this.roomAssociateToFacility.nameRoom;
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

    this.managerService.getRooms().subscribe(res => {
      this.rooms = res;
      this.managerService.publishRooms();
      this.listRooms = this.managerService.listRooms$;
    });

    this.createForm();
  }

  createForm(){
    this.facilityForm = this.formBuilder.group({
      nameFacilityGroup: this.formBuilder.group({
        nameFacility: ['', [
          Validators.required,
          Validators.minLength(1),
        ]]
      }, {validator: this.checkNameFacility.bind(this)}),
      priceFacility: '',
      dateOfPurchase: '',
      priceSeance: ['', [
        Validators.required
      ]],
      descriptionFacility: '',
      imageFacility: '',
      userFile: null,
      nameFacilityCategory: ['', [
        Validators.required
      ]],
      nameRoom: ['', [
        Validators.required
      ]]
    }); 
  }

  

  checkNameFacility(group: FormGroup){
    let nameFacility : string;
    
    nameFacility = group.get("nameFacility").value;
    const isValid = !(this.managerService.listFacilities.find(facility => (facility.nameFacility === nameFacility) && nameFacility != this.nameFacilityInit));
    return isValid ? null : { checkNameFacility: true };
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.facilityForm.get('imageFacility').setValue(this.file.name);
      this.fileInformation = null;
    }
  }

  selectFile(): void {
    this.bChangeImage = true;
    this.fileInput.nativeElement.click();
  }

  


  public onUpdate() {
    const data: FormData = new FormData();
    this.descriptionFacility = (this.descriptionFacility == "") ? "undefined" : this.descriptionFacility;
    this.imageFacility = (this.imageFacility == "") ? "undefined" : this.imageFacility;
      
    if (this.file !== undefined){
      this.imageFacility = this.nameFacility + "_" + this.file.name;
      this.managerService.updateFacility(this.idFacility, this.nameFacilityCategory, this.nameRoom, this.nameFacility, this.priceSeance, this.descriptionFacility, this.imageFacility, this.priceFacility, false);
      data.append('data', this.file, this.nameFacility + "_" + this.file.name);
      this.managerService.addImage(data, "facilityForm");
    }
    else {
      this.managerService.updateFacility(this.idFacility, this.nameFacilityCategory, this.nameRoom, this.nameFacility, this.priceSeance, this.descriptionFacility, this.imageFacility, this.priceFacility, true);
    }




  }

}
