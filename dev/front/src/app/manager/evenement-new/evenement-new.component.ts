import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileInformation } from '../file-information';
import { OffresService } from 'src/app/services/offres.service';
import { ManagerService } from 'src/app/services/manager.service';
import { Evenement } from 'src/app/models/evenement.model';
import { Authority } from 'src/app/models/authority.model';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { errorMessages} from '../../services/custom-validators.service';
import { EvenementService } from '../../services/evenement.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-evenement-new',
  templateUrl: './evenement-new.component.html',
  styleUrls: ['./evenement-new.component.css']
})
export class EvenementNewComponent implements OnInit {

  evenementForm: FormGroup;
  file: File;
  fileInformation: FileInformation;
  listEvenements: BehaviorSubject<Evenement[]>;

  
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

  idEvt: number;
  titleEvt: string;
  descriptionEvt: string;
  startDateTimeEvt: Date;
  endDateTimeEvt: Date;
  imageEvt: string;
  videoEvt: string;
  
  errors = errorMessages;
  

  @ViewChild('fileInput')
  fileInput: ElementRef;
  username: string;
  password: string;

  constructor(private formBuilder: FormBuilder,
              private managerService: ManagerService,
              private loginService: LoginService,
              private evenementService: EvenementService,
              private snackBar: MatSnackBar
              ) {
                this.initDateField();
                this.initTimeField();
  }

  ngOnInit(): void {
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
      console.log(`file: ${JSON.stringify(this.file.name)}`);
      console.log(`file: ${JSON.stringify(this.file.size)}`);
      this.fileInformation = null;
    }
  }

  selectFile(): void {
    this.fileInput.nativeElement.click();
  }

  public initDateField(){
    this.startDateEvt = new Date();
    this.shownYear = this.startDateEvt.getFullYear().toString();
    this.currentMonth = this.startDateEvt.getMonth() + 1;
    this.currentDay = this.startDateEvt.getDate();
    
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
    
    this.strStartDateEvt = this.shownYear + "-" + this.shownMonth + "-" + this.shownDay;
    this.strEndDateEvt = this.shownYear + "-" + this.shownMonth + "-" + this.shownDay;
  }

  public initTimeField(){
    this.startDateEvt = new Date();
    this.currentHour = this.startDateEvt.getHours();
    if(this.currentHour <10) {
      this.shownHour = "0" + this.currentHour.toString();
    } else{
      this.shownHour = this.currentHour.toString();
    }

    this.currentMinute = this.startDateEvt.getMinutes();
    if(this.currentMinute <10) {
      this.shownMinute = "0" + this.currentMinute.toString();
    } else{
      this.shownMinute = this.currentMinute.toString();
    }
    
   this.strStartTimeEvt = this.shownHour + ":" + this.shownMinute;
   this.strEndTimeEvt = this.shownHour + ":" + this.shownMinute;
  }



  public onRegister() {
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
      
    this.evenementService.getIdMaxEvt().subscribe(
      (res) => {
        this.idEvt = res + 1;
        let evenement: Evenement = new Evenement(this.titleEvt, this.descriptionEvt, this.startDateTimeEvt, this.endDateTimeEvt, "", this.videoEvt);

       if (this.file !== undefined){
          data.append('data', this.file, this.idEvt + "_" + this.file.name);
          console.log("this.file : ", this.file);
          console.log("this.fileInput : ", this.fileInput);
          console.log("data : ", data);
    
          this.imageEvt = this.idEvt + "_" + this.file.name;
          evenement.imageEvt = this.imageEvt;
          data.append('data', this.file, this.idEvt + "_" + this.file.name);
          this.evenementService.addEvenement(evenement, false);
          this.managerService.addImage(data, this.username, this.password, "evenementForm");
        }
        else {
          this.evenementService.addEvenement(evenement, true);
        }
      },
      (error) => {console.log("get idMaxEvt error : ", error);}
    )    
     
  }

}
