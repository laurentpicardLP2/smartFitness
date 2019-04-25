import { ReportingService } from 'src/app/services/reporting.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { QueryList, ViewChildren } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatCarouselSlideComponent,
  Orientation
} from '@ngmodule/material-carousel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isAuth: boolean;
  fullname: string;
  authority: string;
  public slidesList = new Array<never>(5);
  public showContent = false;
  indexEvt: number = -1;

  evenementArray: string [] = [];
  evenementTitle: string = "";

  public timings = '250ms ease-in';
  public autoplay = true;
  public interval = 5000;
  public loop = true;
  public hideArrows = false;
  public hideIndicators = false;
  public color: ThemePalette = 'primary';
  public maxWidth = 'auto';
  public proportion = 25;
  public slides = this.slidesList.length;
  public overlayColor = '#00000010';
  public hideOverlay = false;
  public useKeyboard = true;
  public useMouseWheel = false;
  public orientation: Orientation = 'ltr';

  @ViewChildren(MatCarouselSlideComponent) public carouselSlides: QueryList<
    MatCarouselSlideComponent
  >;
  public darkMode = false;
  
  constructor(private loginService: LoginService,
              private reportingService: ReportingService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginService.isUserLoggedSubject.subscribe(res => {
      this.isAuth = res;
    });

    this.loginService.fullnameSubject.subscribe(res => {
      this.fullname = res;
    });

    this.loginService.authoritySubject.subscribe(res => {
      this.authority = res.authority;
    });

    this.evenementArray.push("Ouverture demain à 8h");
    this.evenementArray.push("Session coaching samedi et dimanche de 9h à 12h");

    if(this.evenementArray.length > 0){
      this.showEvenementsLoop();
    }
    
  }

  public onReportingBooking(){
    this.reportingService.publishDataSetBooking();
  }

  public onReportingRentability(){
    this.reportingService.publishDataSetRentability();
  }

  public showEvenementsLoop(){
    this.indexEvt = (this.indexEvt==this.evenementArray.length-1) ? 0 : this.indexEvt + 1;
    this.evenementTitle = this.evenementArray[this.indexEvt];
    setTimeout(() => this.showEvenementsLoop(), 3000);
  }

  public redirectTo(index: number){
    console.log("index : ", index);
  }

  public showMustSignIn(){
    this.snackBar.open("Veuillez vous connecter pour accéder à cette fonctionnalité", "Ok", {
      duration: 3000,
    });
  }

}
