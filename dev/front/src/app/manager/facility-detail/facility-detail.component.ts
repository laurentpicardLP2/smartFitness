import { ManagerService } from 'src/app/services/manager.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Facility } from 'src/app/models/facility.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html',
  styleUrls: ['./facility-detail.component.css']
})
export class FacilityDetailComponent implements OnInit {
  idFacility: number;
  nameFacility: string;
  nameFacilityInit: string;
  priceSeance: number;
  facilityForm: FormGroup;
  listFacilities: BehaviorSubject<Facility[]>;
  facilities: Facility[];
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private managerService: ManagerService,
    private router: Router) { }

  ngOnInit() {
    this.idFacility = +this.route.snapshot.params.idFacility;
    this.managerService.publishFacilities;
    this.managerService.findFacility(this.idFacility).subscribe(facility => {
      this.idFacility = facility.idFacility;
      this.nameFacility = facility.nameFacility;
      this.nameFacilityInit = facility.nameFacility;
      this.priceSeance = facility.priceSeance;
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
        priceSeance: ['', ]
    }); 
  }

  

  checkNameFacility(group: FormGroup){
    let nameFacility : string;
    
    nameFacility = group.get("nameFacility").value;
    const isValid = !(this.managerService.listFacilities.find(facility => (facility.nameFacility === nameFacility) && nameFacility != this.nameFacilityInit));
    return isValid ? null : { checkNameFacility: true };
  }

  


  public onUpdate() {
    this.managerService.updateFacility(this.idFacility,this.nameFacility, this.priceSeance);
  }

}
