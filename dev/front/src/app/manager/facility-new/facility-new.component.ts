import { LoginService } from 'src/app/services/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileInformation } from '../file-information';
import { ManagerService } from 'src/app/services/manager.service';
import { FacilityCategory } from 'src/app/models/facility-category.model';
import { Room } from 'src/app/models/room.model';
import { BehaviorSubject } from 'rxjs';

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
  rooms: Room[];
  nameFacility : string;
  descriptionFacility: string;
  imageFacility: string;;
  idFacilityCategory: number;
  idRoom: number;

  @ViewChild('fileInput')
  fileInput: ElementRef;

  constructor(private httpClient: HttpClient, 
              private formBuilder: FormBuilder,
              private managerService: ManagerService,
              private loginService: LoginService) {
 
  }

  ngOnInit(): void {
    //this.loginService.setIsUserLoggedSubject(true);
    // TO DO reinit setUsername

    this.managerService.getFacilityCategories().subscribe(res => {
      this.facilityCategories = res;
      this.managerService.publishFacilityCategories();
      this.listFacilityCategories = this.managerService.listFacilityCategories$;
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
      nameFacility: ['', [
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
        data.append('data', this.file, this.nameFacility + "_" + this.file.name);
        this.managerService.addImage(data, this.idFacilityCategory, this.idRoom, this.nameFacility, this.descriptionFacility, this.imageFacility);
      } else {
        this.managerService.addFacility(this.idFacilityCategory, this.idRoom, this.nameFacility, this.descriptionFacility, this.imageFacility);
      }
      
   
  }

}
