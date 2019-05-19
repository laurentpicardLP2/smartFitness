import { UtilsService } from 'src/app/services/utils.service';
import { ManagerService } from 'src/app/services/manager.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { FacilityCategory } from 'src/app/models/facility-category.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { FacilityCategoryValidator } from 'src/app/validators/facility-category.validator';
import { EvenementService } from 'src/app/services/evenement.service';
import { Evenement } from 'src/app/models/evenement.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileInformation } from '../file-information';
import { OffresService } from 'src/app/services/offres.service';
import { Authority } from 'src/app/models/authority.model';
import { User } from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmbedVideoService } from 'ngx-embed-video';


@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.css']
})
export class EvenementDetailComponent implements OnInit {
  idEvt: number;
  titleEvt: string;
  descriptionEvt: string;
  startDateTimeEvt: Date;
  endDateTimeEvt: Date;
  imageEvt: string = '';
  videoEvt: string = '';

  iframe_html: any;
  youtubeUrl: string = '';

  evenementForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  listEvenements: BehaviorSubject<Evenement[]>;
  bChangeImage: boolean = false;

  
  startDateEvt: Date;
  strStartDateEvt: string;
  startTimeEvt: Date;
  strStartTimeEvt: string;
  endDateEvt: Date;
  strEndDateEvt: string;
  endTimeEvt: Date;
  strEndTimeEvt: string;
  currentMinute: number;
  shownMinute: string;
  currentHour: number;
  shownHour: string;
  shownYear: string;
  currentMonth: number;
  shownMonth: string;
  currentDay: number;
  shownDay: string;

  errors = errorMessages;
  
  @ViewChild('fileInput')
  fileInput: ElementRef;
  username: string;
  password: string;
  

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private evenementService: EvenementService,
    private router: Router,
    private managerService: ManagerService,
    private loginService: LoginService,
    private utilsService: UtilsService,
    private snackBar: MatSnackBar,
    private embedService: EmbedVideoService) {
      
             }

  ngOnInit() {
    this.idEvt = +this.route.snapshot.params.idEvt;
    this.evenementService.getEvenementById(this.idEvt).subscribe(
      (res) => {
        this.titleEvt = res.titleEvt;
        this.descriptionEvt = res.descriptionEvt;
        this.startDateTimeEvt = res.startDateTimeEvt;
        this.endDateTimeEvt = res.endDateTimeEvt;
        this.imageEvt = res.imageEvt;
        this.videoEvt = res.videoEvt;
        this.youtubeUrl = this.videoEvt;
        if(this.videoEvt != null && this.videoEvt != '') {
          this.iframe_html = this.embedService.embed(this.youtubeUrl);
        }
               
        this.strStartDateEvt = this.initDateField(this.startDateTimeEvt);
        this.strStartTimeEvt = this.initTimeField(this.startDateTimeEvt);
        this.strEndDateEvt = this.initDateField(this.endDateTimeEvt);
        this.strEndTimeEvt = this.initTimeField(this.endDateTimeEvt);
      },
      (error) => {this.router.navigate(['error-page']);}
    );

    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });

    this.loginService.passwordSubject.subscribe(res => {
      this.password = res;
    });

    
    this.createForm();
 
  }

  createForm(){
    this.evenementForm = this.formBuilder.group({
      titleEvt: ['', [
        Validators.required,
        Validators.minLength(1)
      ]],
      descriptionEvt: '',
      imageEvt: '',
      videoEvt: '',
      startDateEvt: ['', [
        Validators.required
      ]],
      startTimeEvt: ['', [
        Validators.required
      ]],
      endDateEvt: ['', [
        Validators.required
      ]],
      endTimeEvt: ['', [
        Validators.required
      ]],
      userFile: null
    });
    
  }


  onSelectFile(event) {
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.evenementForm.get('imageEvt').setValue(this.file.name);
      this.fileInformation = null;
    }
  }

  selectFile(): void {
    this.bChangeImage = true;
    this.fileInput.nativeElement.click();
  }

  public initDateField(pDateTimeEvt: Date){
    let splitDateOfTimestamp = pDateTimeEvt.toString().split("T");
    let datePart = splitDateOfTimestamp[0];
    let splitDatePart: string[] = datePart.split("-");
    let timePart = splitDateOfTimestamp[1];
    let timeZoneOffset = (new Date(parseInt(splitDatePart[0], 10),  parseInt(splitDatePart[1], 10) - 1, parseInt(splitDatePart[2], 10))).getTimezoneOffset();
    let splitTimePart = timePart.split(":");
    let readGetTime = new Date(parseInt(splitDatePart[0], 10),  parseInt(splitDatePart[1], 10) - 1, parseInt(splitDatePart[2], 10), parseInt(splitTimePart[0],10), parseInt(splitTimePart[1],10)).getTime();
    let readDateTime = new Date(readGetTime - ((timeZoneOffset/60)*3600000 + (timeZoneOffset%60) * 60000));
    this.shownYear = readDateTime.getFullYear().toString();
    this.currentMonth = readDateTime.getMonth() + 1;
    this.currentDay = readDateTime.getDate();
    
    if(this.currentMonth <10) {
      this.shownMonth = "0" + this.currentMonth.toString();
    } else{
      this.shownMonth = this.currentMonth.toString();
    }
    if(this.currentDay < 10) {
      this.shownDay = "0" + this.currentDay.toString();
    } else{
      this.shownDay = this.currentDay.toString();
    }
    
    return this.shownYear + "-" + this.shownMonth + "-" + this.shownDay;
    
  }

  public initTimeField(pDateTimeEvt: Date){
    let splitDateOfTimestamp = pDateTimeEvt.toString().split("T");
    let datePart = splitDateOfTimestamp[0];
    let splitDatePart: string[] = datePart.split("-");
    let timePart = splitDateOfTimestamp[1];
    let timeZoneOffset = (new Date(parseInt(splitDatePart[0], 10),  parseInt(splitDatePart[1], 10) - 1, parseInt(splitDatePart[2], 10))).getTimezoneOffset();
    let splitTimePart = timePart.split(":");
    let readGetTime = new Date(parseInt(splitDatePart[0], 10),  parseInt(splitDatePart[1], 10) - 1, parseInt(splitDatePart[2], 10), parseInt(splitTimePart[0],10), parseInt(splitTimePart[1],10)).getTime();
    let readDateTime = new Date(readGetTime - ((timeZoneOffset/60)*3600000 + (timeZoneOffset%60) * 60000));
   
    this.currentHour = readDateTime.getHours();
    if(this.currentHour <10) {
      this.shownHour = "0" + this.currentHour.toString();
    } else{
      this.shownHour = this.currentHour.toString();
    }

    this.currentMinute = readDateTime.getMinutes();
    if(this.currentMinute <10) {
      this.shownMinute = "0" + this.currentMinute.toString();
    } else{
      this.shownMinute = this.currentMinute.toString();
    }
    
   return this.shownHour + ":" + this.shownMinute;
  }



  public onUpdate() {
      const data: FormData = new FormData();
      let splitDateField = this.strStartDateEvt.split("-");
      let splitTimeField = this.strStartTimeEvt.split(":");
      this.startDateTimeEvt = new Date(parseInt(splitDateField[0],10), parseInt(splitDateField[1], 10) - 1, parseInt(splitDateField[2], 10), 
        parseInt(splitTimeField[0], 10),parseInt(splitTimeField[1], 10));

      splitDateField = this.strEndDateEvt.split("-");
      splitTimeField = this.strEndTimeEvt.split(":");
      this.endDateTimeEvt = new Date(parseInt(splitDateField[0],10), parseInt(splitDateField[1], 10) - 1, parseInt(splitDateField[2], 10), 
        parseInt(splitTimeField[0], 10),parseInt(splitTimeField[1], 10));
      if (this.startDateTimeEvt >= this.endDateTimeEvt){
        this.snackBar.open("La fin de l'événement doit être postérieure au début", "Ok", {
          duration: 3000,
        });
        return;
      }
      
    
      let evenement: Evenement = new Evenement(this.titleEvt, this.descriptionEvt, this.startDateTimeEvt, this.endDateTimeEvt, this.imageEvt, this.videoEvt);
      evenement.idEvt = this.idEvt;

      if (this.file !== undefined){
        data.append('data', this.file, this.idEvt + "_" + this.file.name);
        this.imageEvt = this.idEvt + "_" + this.file.name;
        evenement.imageEvt = this.imageEvt;
        data.append('data', this.file, this.idEvt + "_" + this.file.name);
        this.evenementService.updateEvenement(evenement, false);
        this.managerService.addImage(data, this.username, this.password, "evenementForm");
      }
      else {
        this.evenementService.updateEvenement(evenement, true);
      }     
     
  }

  

}
