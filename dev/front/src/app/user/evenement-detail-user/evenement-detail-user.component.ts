import { Router, ActivatedRoute } from '@angular/router';
import { EvenementService } from 'src/app/services/evenement.service';
import { Component, OnInit } from '@angular/core';
import { EmbedVideoService } from 'ngx-embed-video'

@Component({
  selector: 'app-evenement-detail-user',
  templateUrl: './evenement-detail-user.component.html',
  styleUrls: ['./evenement-detail-user.component.css']
})
export class EvenementDetailUserComponent implements OnInit {
  idEvt: number;
  titleEvt: string;
  descriptionEvt: string;
  imageEvt: string = '';
  videoEvt: string = '';
  iframe_html: any;
  youtubeUrl: string = '';

  constructor(private route: ActivatedRoute,
    private evenementService: EvenementService,
    private router: Router,
    private embedService: EmbedVideoService) {
      
             }

  ngOnInit() {
    this.idEvt = +this.route.snapshot.params.idEvt;
    console.log("this.idEvt : ", this.idEvt);
    this.evenementService.getEvenementById(this.idEvt).subscribe(
      (res) => {
        this.titleEvt = res.titleEvt;
        this.descriptionEvt = res.descriptionEvt;
        this.imageEvt = res.imageEvt;
        this.videoEvt = res.videoEvt;
        this.youtubeUrl = this.videoEvt;
        if(this.videoEvt != null && this.videoEvt != '') {
          this.iframe_html = this.embedService.embed(this.youtubeUrl);
        }
      },
      (error) => {this.router.navigate(['error-page']);}
    );
  }
}
