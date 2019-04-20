import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { QueryList, ViewChildren } from '@angular/core';
import { ThemePalette } from '@angular/material';
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
  public slidesList = new Array<never>(5);
  public showContent = false;

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
  
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.isUserLoggedSubject.subscribe(res => {
      this.isAuth = res;
    });

    this.loginService.fullnameSubject.subscribe(res => {
      this.fullname = res;
    });
  }

}
