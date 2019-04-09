import { ManagerService } from 'src/app/services/manager.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { FacilityCategory } from 'src/app/models/facility-category.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';


@Component({
  selector: 'app-facility-category-detail',
  templateUrl: './facility-category-detail.component.html',
  styleUrls: ['./facility-category-detail.component.css']
})
export class FacilityCategoryDetailComponent implements OnInit {

  idFacilityCategory: number;
  nameFacilityCategory: string;
  nameFacilityCategoryInit: string;
  priceFacilityCategory: number;
  facilityCategoryForm: FormGroup;
  listFacilityCategories: BehaviorSubject<FacilityCategory[]>;
  facilityCategories: FacilityCategory[];
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private router: Router) { }

  ngOnInit() {
    this.idFacilityCategory = +this.route.snapshot.params.idFacilityCategory;
    this.managerService.publishFacilityCategories;
    this.managerService.findFacilityCategory(this.idFacilityCategory).subscribe(facilityCategory => {
      this.idFacilityCategory = facilityCategory.idFacilityCategory;
      this.nameFacilityCategory = facilityCategory.nameFacilityCategory;
      this.nameFacilityCategoryInit = facilityCategory.nameFacilityCategory;
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
    const isValid = !(this.managerService.listFacilityCategories.find(facilityCategory => (facilityCategory.nameFacilityCategory === nameFacilityCategory) && nameFacilityCategory != this.nameFacilityCategoryInit));
    return isValid ? null : { checkNameFacilityCategory: true };
  }

  
  public onUpdate() {
    this.managerService.updateFacilityCategory(this.idFacilityCategory,this.nameFacilityCategory);
  }

}
