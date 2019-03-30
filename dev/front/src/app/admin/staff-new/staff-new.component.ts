import { AdminService } from '../../services/admin.service';
import { Staff } from '../../models/staff.model';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder, AbstractControl} from '@angular/forms';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-staff-new',
  templateUrl: './staff-new.component.html',
  styleUrls: ['./staff-new.component.css']
})
export class StaffNewComponent implements OnInit {

  newStaff: Staff;
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
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private customerService: CustomerService,
    private httpClient: HttpClient
) {
    this.createForm();
}


  ngOnInit() {
    this.customerService.publishAuthorities();
  }

  createForm() {
      this.staffRegistrationForm = this.formBuilder.group({
          fullname: ['', [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(128)
          ]],
          usernameGroup: this.formBuilder.group({
          username: ['', [
            Validators.required,
            Validators.minLength(1),
          ]]
        }, {validator: this.checkUsername.bind(this)}),
        role: ['ROLE_MANAGER', [
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
            confirmPassword: ['', Validators.required]
        }, { validator: CustomValidators.childrenEqual}),
        tel: ['', [
            Validators.required
        ]]
      });
  }


  onRegister(): void {
      this.newStaff = new Staff(
                this.username,  
                this.fullname,
                this.password,
                this.email,
                this.tel, 
                "", 
                ""
                );

    this.adminService.register(this.newStaff, this.role);
 }

  checkUsername(group: FormGroup){
    let username : string;
    
    username = group.get("username").value;
    const isValid = !(this.customerService.availableAuthorities.find(authoritary => authoritary.username === username))
    return isValid ? null : { checkUsername: true };
  }

}