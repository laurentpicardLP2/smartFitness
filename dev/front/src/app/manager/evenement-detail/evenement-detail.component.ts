import { ManagerService } from 'src/app/services/manager.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { FacilityCategory } from 'src/app/models/facility-category.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { FacilityCategoryValidator } from 'src/app/validators/facility-category.validator';
import { EvenementService } from 'src/app/services/evenement.service';


@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.css']
})
export class EvenementDetailComponent implements OnInit {
  idEvt: number;
  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private evenementService: EvenementService,
    private router: Router) { }

  ngOnInit() {
    this.idEvt = +this.route.snapshot.params.idEvt;
    this.evenementService.publishEvenements();
    // this.managerService.findFacilityCategory(this.idFacilityCategory).subscribe(facilityCategory => {
    //   this.idFacilityCategory = facilityCategory.idFacilityCategory;
    //   this.nameFacilityCategory = facilityCategory.nameFacilityCategory;
    //   this.nameFacilityCategoryInit = facilityCategory.nameFacilityCategory;
    // });
  }

}
