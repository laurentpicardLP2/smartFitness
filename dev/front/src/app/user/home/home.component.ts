import { Evenement } from 'src/app/models/evenement.model';
import { Router } from '@angular/router';
import { ReportingService } from 'src/app/services/reporting.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { QueryList, ViewChildren } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatCarouselSlideComponent,
  Orientation
} from '@ngmodule/material-carousel';
import { EvenementService } from 'src/app/services/evenement.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  isAuth: boolean;
  bEvt: boolean = false;
  fullname: string;
  authority: string;
  public slidesList = new Array<never>(5);
  public showContent = false;
  indexEvt: number = -1;

  arrayTitle: string [] = [];
  evenementArray: Evenement [] = [];
  stringTitle: string = "";
  subTimeout;
  nbEvt: number;
  timeouts: number[] = [];

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
              private evenementservice: EvenementService,
              private router: Router,
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
      if(this.authority == 'ROLE_ANONYMOUS'){
        this.arrayTitle.push("Connectez-vous pour accéder aux fonctionnalités.");
        this.arrayTitle.push("Découvrez notre activité et comment venir chez nous.");
        this.bEvt = true;
        this.showEvenementsLoopAnonymous();
      } else if(this.authority == 'ROLE_CUSTOMER'){
        // get Evenements from DataBase into this.evenementArray
        this.arrayTitle = [];
        this.stringTitle = "";
        this.evenementArray = [];
        this.evenementservice.getEvenementInSlotTime().subscribe(
          (res) => {
            
            this.evenementArray = res;
            this.nbEvt = this.evenementArray.length;
            for(let i = 0; i < res.length; i++){
              this.arrayTitle.push(res[i].titleEvt);
            }
            
            if(res.length > 0){
              setTimeout(() => this.showEvenementsLoopCustomer(), 100);
            }
          },
          (error) => {
            this.evenementArray = [];
            this.arrayTitle = [];
            this.stringTitle = "";
          }
        );
        
        
        
      }

    });  
    
  }

  public onReportingBooking(){
    this.reportingService.publishDataSetBooking();
  }

  public onReportingRentability(){
    this.reportingService.publishDataSetRentability();
  }

  public showEvenementsLoopAnonymous(){
    if (this.isAuth === true) {
      clearTimeout(this.subTimeout);
      return ;
    }
    this.indexEvt = (this.indexEvt==this.arrayTitle.length-1) ? 0 : this.indexEvt + 1;
    this.stringTitle = this.arrayTitle[this.indexEvt];
    this.subTimeout = setTimeout(() => this.showEvenementsLoopAnonymous(), 3000);
  }

  public showEvenementsLoopCustomer(){
    
    
    if (this.isAuth === null || this.isAuth === false) {

     return;
      
    }
    
    this.indexEvt = (this.indexEvt==this.arrayTitle.length-1) ? 0 : this.indexEvt + 1;
    this.stringTitle = this.arrayTitle[this.indexEvt];
    
    this.subTimeout = setTimeout(() => this.showEvenementsLoopCustomer(), 3000);
    
  }

  public anonymousRedirectTo(index: number){
    if(index == 0 ){
      this.router.navigate(['login']);
    } else if(index == 1) {
      this.router.navigate(['our-activity']);
    }
    
  }

  public customerRedirectTo(index: number){
    this.router.navigate(['evenement-detail-user/' + this.evenementArray[index].idEvt]);
  }

  public showMustSignIn(){
    this.snackBar.open("Veuillez vous connecter pour accéder à cette fonctionnalité", "Ok");
  }

  ngOnDestroy(){
    clearTimeout(this.subTimeout);
   }

}
