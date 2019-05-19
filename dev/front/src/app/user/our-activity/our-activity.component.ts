/// <reference types="@types/googlemaps" />
import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
declare let google: any;

@Component({
  selector: 'app-our-activity',
  templateUrl: './our-activity.component.html',
  styleUrls: ['./our-activity.component.css']
})
export class OurActivityComponent implements OnInit {

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;


  @ViewChild('map') mapElement: any;
map: google.maps.Map;
 
  constructor(private titleService: Title) {
  }

  title: string = 'Smart Fitness';
  lat: number =  48.83128;
  lng: number = 2.26663;
 
  ngOnInit() {
  }

}
