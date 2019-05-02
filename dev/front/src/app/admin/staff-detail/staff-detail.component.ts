import { UtilsService } from 'src/app/services/utils.service';
import { AdminService } from '../../services/admin.service';
import { Staff } from '../../models/staff.model';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffValidator } from 'src/app/validators/staff.validator';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css']
})
export class StaffDetailComponent implements OnInit {

  updateStaff: Staff;
  staffRegistrationForm: FormGroup;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  errors = errorMessages;
  fullname: string; 
  username: string;
  role: string;
  email: string;
  password: string;
  dayWorking: string;
  hourWorking: string;
  tel: string;
 

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private customerService: CustomerService,
    private utilsService: UtilsService,
    private httpClient: HttpClient
) {
    
}


  ngOnInit() {
    this.customerService.publishAuthorities();
    this.username = this.route.snapshot.params.username;
    
    this.adminService.publishStaff();
    this.adminService.findStaff(this.username).subscribe(staff => {
      this.fullname = staff.fullname;
      this.email = staff.email;
      this.password="";
      this.tel = staff.tel;
    });

    this.customerService.findUsername(this.username).subscribe(authority => {
      this.role = authority.authority;
      console.log("this.role : ", this.role);
    });

    this.createForm();
  }

  createForm() {
      this.staffRegistrationForm = this.formBuilder.group({
          fullname: ['', [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(128)
          ]],
          username: ['', [
            Validators.required,
            Validators.minLength(1),
            StaffValidator.usernameDetailValidator(this.utilsService.availableUsernames, this.username)
          ]],
        role: ['', [
            Validators.required
        ]],
        emailGroup: this.formBuilder.group({
            email: ['', [
                Validators.required,
                Validators.email
            ]],
            confirmEmail: ['', Validators.required]
        }, { validator: CustomValidators.childrenEqual}),
        passwordGroup: this.formBuilder.group({
            password: ['', [
                Validators.required,
                Validators.pattern(regExps.password)
            ]],
            confirmPassword: ['jjjjjjjjjjjj', Validators.required]
        }, { validator: CustomValidators.childrenEqual}),
        tel: ['', [
            Validators.required
        ]]
      });
  }


  onUpdate(): void {
      this.updateStaff = new Staff(
                this.username,  
                this.fullname,
                this.password,
                this.email,
                this.tel, 
                "", 
                ""
                );

    this.adminService.update(this.updateStaff, this.role);
 }

  checkUsername(group: FormGroup){
    let username : string;
    
    username = group.get("username").value;
    const isValid = !(this.customerService.availableAuthorities.find(authoritary => authoritary.username === username))
    return isValid ? null : { checkUsername: true };
  }

}
