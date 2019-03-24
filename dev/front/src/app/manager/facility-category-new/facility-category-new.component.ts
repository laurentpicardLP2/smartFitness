import { FacilityCategory } from 'src/app/models/facility-category.model';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ManagerService } from 'src/app/services/manager.service';
import { Room } from 'src/app/models/room.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';

@Component({
  selector: 'app-facility-category-new',
  templateUrl: './facility-category-new.component.html',
  styleUrls: ['./facility-category-new.component.css']
})
export class FacilityCategoryNewComponent implements OnInit {

  facilityCategoryForm: FormGroup;
  listFacilityCategories: BehaviorSubject<FacilityCategory[]>;
  facilityCategories: FacilityCategory[];
  nameFacilityCategory : string;
  priceFacilityCategory: number;
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private httpClient: HttpClient, 
              private formBuilder: FormBuilder,
              private managerService: ManagerService,
              private loginService: LoginService) {
 
  }

  ngOnInit(): void {

    this.managerService.getFacilityCategories().subscribe(res => {
      this.facilityCategories = res;
      this.managerService.publishFacilityCategories();
      this.listFacilityCategories = this.managerService.listFacilityCategories$;
    });
    
    this.createForm();
  }

  createForm(){
    this.facilityCategoryForm = this.formBuilder.group({
      nameFacilityCategoryGroup: this.formBuilder.group({
        nameFacilityCategory: ['', [
          Validators.required,
          Validators.minLength(1),
        ]]
      }, {validator: this.checkNameFacilityCategory.bind(this)}),
        priceFacilityCategory: ['', ]
    }); 
  }

  

  checkNameFacilityCategory(group: FormGroup){
    let nameFacilityCategory : string;
    
    nameFacilityCategory = group.get("nameFacilityCategory").value;
    const isValid = !(this.managerService.listFacilityCategories.find(facilityCategory => facilityCategory.nameFacilityCategory === nameFacilityCategory));
    return isValid ? null : { checkNameFacilityCategory: true };
  }

  


  public onValidate() {
    this.managerService.addFacilityCategory(this.nameFacilityCategory, this.priceFacilityCategory);
  }
}