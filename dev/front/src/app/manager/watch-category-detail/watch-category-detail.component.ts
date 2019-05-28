
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileInformation } from '../file-information';

import { ManagerService } from 'src/app/services/manager.service';
import { OffresService } from 'src/app/services/offres.service';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { WatchCategory } from 'src/app/models/watch-category.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { WatchValidator } from 'src/app/validators/watch.validator';

@Component({
  selector: 'app-watch-category-detail',
  templateUrl: './watch-category-detail.component.html',
  styleUrls: ['./watch-category-detail.component.css']
})
export class WatchCategoryDetailComponent implements OnInit {

  watchCategoryForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  idWatchCategory: number;
  nameWatch: string;
  nameWatchInit: string;
  priceWatch: number;
  descriptionWatch: string;
  imageWatch: string = '';
  watchCatregoryForm: FormGroup;
  listWatchCtegories: BehaviorSubject<WatchCategory[]>;
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  @ViewChild('fileInput')
  fileInput: ElementRef;
  bChangeImage: boolean = false;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private managerService: ManagerService,
    private offresService: OffresService,
    private router: Router) { }

  ngOnInit() {
    this.idWatchCategory = +this.route.snapshot.params.idWatchCategory;
    this.offresService.publishWatchCategories();
    this.offresService.findwatchCategory(this.idWatchCategory).subscribe(watchCategory => {
      this.idWatchCategory = watchCategory.idWatchCategory;
      this.nameWatch = watchCategory.nameWatch;
      this.nameWatchInit = watchCategory.nameWatch;
      this.priceWatch = watchCategory.priceWatch;
      this.descriptionWatch = watchCategory.descriptionWatch;
      this.imageWatch = watchCategory.imageWatch;
    });
    
    this.createForm();
  }

  createForm(){
    this.watchCategoryForm = this.formBuilder.group({
      nameWatch: ['', [
        Validators.required,
        Validators.minLength(1),
        WatchValidator.nameWatchDetailValidator(this.offresService.listNameWatches, this.nameWatchInit)
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
    const isValid = !(this.offresService.listWatchCategories.find(watchCategory => (watchCategory.nameWatch === nameWatch) && nameWatch != this.nameWatchInit ));
    return isValid ? null : { checkNameWatch: true };
  }


  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.watchCategoryForm.get('imageWatch').setValue(this.file.name);
      this.fileInformation = null;
    }
  }

  selectFile(): void {
    this.bChangeImage = true;
    this.fileInput.nativeElement.click();
  }



  


  public onUpdate() {
    this.descriptionWatch = (this.descriptionWatch == "") ? "undefined" : this.descriptionWatch;
    this.imageWatch = (this.imageWatch == "") ? "undefined" : this.imageWatch;
    
    const data: FormData = new FormData();
      
    if (this.file !== undefined){
      this.imageWatch = this.nameWatch + "_" + this.file.name;
      data.append('data', this.file, this.nameWatch + "_" + this.file.name);
      this.offresService.updateWatchCategory(this.idWatchCategory, this.nameWatch, this.priceWatch,  this.descriptionWatch, this.imageWatch, false);
      this.managerService.addImage(data,"watchCategoryForm");
    }
    else {
      this.offresService.updateWatchCategory(this.idWatchCategory, this.nameWatch, this.priceWatch,  this.descriptionWatch, this.imageWatch, true);
    }
     
  }
}
  



