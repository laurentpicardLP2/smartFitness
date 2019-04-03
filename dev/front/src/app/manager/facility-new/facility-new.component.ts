import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileInformation } from '../file-information';
import { ManagerService } from 'src/app/services/manager.service';
import { FacilityCategory } from 'src/app/models/facility-category.model';
import { Authority } from 'src/app/models/authority.model';
import { User } from 'src/app/models/user.model';
import { Facility } from 'src/app/models/facility.model';
import { Room } from 'src/app/models/room.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';

@Component({
  selector: 'app-facility-new',
  templateUrl: './facility-new.component.html',
  styleUrls: ['./facility-new.component.css']
})
export class FacilityNewComponent implements OnInit {

  facilityForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  listFacilityCategories: BehaviorSubject<FacilityCategory[]>;
  listRooms: BehaviorSubject<Room[]>;
  facilityCategories: FacilityCategory[];
  listFacilities: BehaviorSubject<Facility[]>;
  facilities: Facility[];
  rooms: Room[];
  nameFacility: string;
  priceFacility: number;
  descriptionFacility: string;
  imageFacility: string;
  idFacilityCategory: number;
  idRoom: number;
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  @ViewChild('fileInput')
  fileInput: ElementRef;
  username: string;
  password: string;

  constructor(private httpClient: HttpClient, 
              private formBuilder: FormBuilder,
              private managerService: ManagerService,
              private loginService: LoginService,
              private router: Router,
              private token: TokenStorageService) {
 
  }

  ngOnInit(): void {
    //this.loginService.setIsUserLoggedSubject(true);
    // TO DO reinit setUsername après upload image file

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

    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });

    this.loginService.passwordSubject.subscribe(res => {
      this.password = res;
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
      priceFacility: ['', [
        Validators.required
      ]],
      descriptionFacility: '',
      imageFacility: '',
      userFile: null,
      idFacilityCategory: null,
      idRoom: [null, [
        Validators.required
    ]]
    });

    
  }

  checkNameFacility(group: FormGroup){
    let nameFacility : string;
    
    nameFacility = group.get("nameFacility").value;
    const isValid = !(this.managerService.listFacilities.find(facility => facility.nameFacility === nameFacility ));
    return isValid ? null : { checkNameFacility: true };
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.facilityForm.get('imageFacility').setValue(this.file.name);
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
    }
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }


  public onValidate() {
      const data: FormData = new FormData();
      
      if (this.file !== undefined){
        this.imageFacility = this.nameFacility + "_" + this.file.name;
        this.managerService.addFacility(this.idFacilityCategory, this.idRoom, this.nameFacility, this.descriptionFacility, this.imageFacility, this.priceFacility);
        data.append('data', this.file, this.nameFacility + "_" + this.file.name);
        this.managerService.addImage(data, this.username, this.password, "facilityForm");
      }
      else {
        this.managerService.addFacility(this.idFacilityCategory, this.idRoom, this.nameFacility, this.descriptionFacility, this.imageFacility, this.priceFacility);
      }
       
  
      
       
  }


}
