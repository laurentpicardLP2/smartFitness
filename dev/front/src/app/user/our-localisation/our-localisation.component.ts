/// <reference types="@types/googlemaps" />
import {Component, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
declare let google: any;

@Component({
  selector: 'app-our-localisation',
  templateUrl: './our-localisation.component.html',
  styleUrls: ['./our-localisation.component.css']
})
export class OurLocalisationComponent {

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;


  @ViewChild('map') mapElement: any;
map: google.maps.Map;
//this.map = new google.maps.Map(....);
 
  constructor() {
  }

}


