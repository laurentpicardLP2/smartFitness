import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileInformation } from '../file-information';
import { OffresService } from 'src/app/services/offres.service';
import { ManagerService } from 'src/app/services/manager.service';
import { WatchCategory } from 'src/app/models/watch-category.model';
import { Authority } from 'src/app/models/authority.model';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { WatchValidator } from 'src/app/validators/watch.validator';

@Component({
  selector: 'app-watch-category-new',
  templateUrl: './watch-category-new.component.html',
  styleUrls: ['./watch-category-new.component.css']
})
export class WatchCategoryNewComponent implements OnInit {

  watchCategoryForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  listWatchCategories: BehaviorSubject<WatchCategory[]>;
  idWatchCategory: number;
  nameWatch: string;
  priceWatch: number;
  descriptionWatch: string;
  imageWatch: string;
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  @ViewChild('fileInput')
  fileInput: ElementRef;
  username: string;
  password: string;

  constructor(private httpClient: HttpClient, 
              private formBuilder: FormBuilder,
              private offresService: OffresService,
              private managerService: ManagerService,
              private loginService: LoginService,
              private router: Router,
              private token: TokenStorageService) {
 
  }

  ngOnInit(): void {
    //this.loginService.setIsUserLoggedSubject(true);
    // TO DO reinit setUsername après upload image file

    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });

    this.loginService.passwordSubject.subscribe(res => {
      this.password = res;
    });

    this.offresService.publishWatchCategories();
    
    this.createForm();
  }

  createForm(){
    this.watchCategoryForm = this.formBuilder.group({
      nameWatch: ['', [
        Validators.required,
        Validators.minLength(1),
        WatchValidator.nameWatchValidator(this.offresService.listNameWatches)
      ]],
      priceWatch: ['', [
        Validators.required
      ]],
      descriptionWatch: '',
      imageWatch: '',
      userFile: null,
      idWatchCategory: null,
    });
    
  }

  checkNameWatch(group: FormGroup){
    let nameWatch : string;
    
    nameWatch = group.get("nameWatch").value;
    const isValid = !(this.offresService.listWatchCategories.find(watchCategory => watchCategory.nameWatch === nameWatch ));
    return isValid ? null : { checkNameWatch: true };
  }

  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.watchCategoryForm.get('imageWatch').setValue(this.file.name);
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
    }
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }



  public onRegister() {
      const data: FormData = new FormData();

      if (this.file !== undefined){
        data.append('data', this.file, this.nameWatch + "_" + this.file.name);
        console.log("this.file : ", this.file);
        console.log("this.fileInput : ", this.fileInput);
        console.log("data : ", data);
  
        this.imageWatch = this.nameWatch + "_" + this.file.name;
        data.append('data', this.file, this.nameWatch + "_" + this.file.name);
        this.offresService.addWatchCategory(this.nameWatch, this.priceWatch, this.descriptionWatch, this.imageWatch, false);
        this.managerService.addImage(data, this.username, this.password, "watchCategoryForm");
      }
      else {
        this.offresService.addWatchCategory(this.nameWatch, this.priceWatch, this.descriptionWatch, this.imageWatch, true);
      }
     
  }

}
