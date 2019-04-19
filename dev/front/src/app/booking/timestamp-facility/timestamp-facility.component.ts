import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatCarouselSlideComponent,
  Orientation
} from '@ngmodule/material-carousel';


@Component({
  selector: 'app-timestamp-facility',
  templateUrl: './timestamp-facility.component.html',
  styleUrls: ['./timestamp-facility.component.css']
})
export class TimestampFacilityComponent {

  public slidesList = new Array<never>(5);
  public showContent = false;

  public timings = '250ms ease-in';
  public autoplay = true;
  public interval = 5000;
  public loop = true;
  public hideArrows = false;
  public hideIndicators = false;
  public color: ThemePalette = 'accent';
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


  

  constructor(
    private snackBar: MatSnackBar,
    private overlayContainer: OverlayContainer,
    private elementRef: ElementRef<HTMLElement>
  ) {}

  public toggleTheme(): void {
    this.darkMode = !this.darkMode;

    const elems = [
      this.elementRef.nativeElement,
      this.overlayContainer.getContainerElement()
    ];

    for (const elem of elems) {
      if (this.darkMode) {
        elem.classList.add('demo-dark-theme');
        continue;
      }

      elem.classList.remove('demo-dark-theme');
    }
  }

  public copy(): void {
    const textarea = document.createElement('textarea');
    textarea.value = "AppComponent.INSTALL_TEXT";
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-99999px';

    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    this.snackBar.open('Command was successfully copied to clipboard!', '', {
      duration: 2000
    });
  }

  public resetSlides(): void {
    this.carouselSlides.forEach(item => (item.disabled = false));
  }

 
}
