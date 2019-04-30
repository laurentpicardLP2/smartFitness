/// <reference types="@types/googlemaps" />
import {Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
declare let google: any;

@Component({
  selector: 'app-our-localisation',
  templateUrl: './our-localisation.component.html',
  styleUrls: ['./our-localisation.component.css']
})
export class OurLocalisationComponent implements OnInit {

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;


  @ViewChild('map') mapElement: any;
map: google.maps.Map;
//this.map = new google.maps.Map(....);
 
  constructor(private titleService: Title) {
  }

  title: string = 'Smart Fitness';
  lat: number =  48.8534;
  lng: number = 2.3488;
 
  ngOnInit() {
//     const mapProperties = {
//       center: new google.maps.LatLng(35.2271, -80.8431),
//       zoom: 15,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//  };

//  this.map = new google.maps.Map(this.mapElement.nativeElement,    mapProperties);

//     this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');
 
//     this.zoom = 10;
//     this.latitude = 52.520008;
//     this.longitude = 13.404954;
 
//     this.setCurrentPosition();
 
  }
 
  // private setCurrentPosition() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }
 
  // onAutocompleteSelected(result: PlaceResult) {
  //   console.log('onAutocompleteSelected: ', result);
  // }
 
  // onLocationSelected(location: Location) {
  //   console.log('onLocationSelected: ', location);
  //   this.latitude = location.latitude;
  //   this.longitude = location.longitude;
  // }
}


