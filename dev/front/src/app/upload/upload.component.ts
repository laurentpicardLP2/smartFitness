import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  data: FormData;
  constructor(private token: TokenStorageService,
              private route: ActivatedRoute,
              private httpClient: HttpClient) { }

  ngOnInit() {
    this.data = this.route.snapshot.params.data;
    this.addImage();
  }

  addImage(){
    console.log("data : ", this.data);
    this.httpClient.post(
      'http://localhost:8080/managerctrl/upload', this.data).subscribe(() => {
        //this.addFacility(idFacilityCategory, idRoom, nameFacility, descriptionFacility, imageFacility, priceFacility);
      },
        (error) => {console.log("pb upload fichier ", error);}
      );
    }

}
