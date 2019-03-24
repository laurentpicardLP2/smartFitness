import { TimestampFacilityAdaptater } from 'src/app/models/timestamp-facility-adaptater.model';
import { SyntheseService } from 'src/app/services/synthese.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-seance-detail',
  templateUrl: './seance-detail.component.html',
  styleUrls: ['./seance-detail.component.css']
})
export class SeanceDetailComponent implements OnInit {
  idItem: number;
  timstampFacilitiesList: BehaviorSubject<TimestampFacilityAdaptater[]>;
  dayName: string;
	dayOfMonth: number;
  monthName: number;
  year: number;
  days: string[] = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  constructor(private route: ActivatedRoute,
              private syntheseService: SyntheseService,
              private router: Router) { }

  ngOnInit() {
    this.idItem = +this.route.snapshot.params.idItem;
    this.syntheseService.publishTimestampFor(this.idItem);
    this.timstampFacilitiesList = this.syntheseService.listTimestampForASeance$
  }

  public showTwoDigitsMinute(intMinute: number){
    if(intMinute.toString().length==1){
      return intMinute.toString() + "0";
    }
    else {
      return intMinute.toString()
    }
  }

  public showTwoDigitsHour(intHour: number){
    if(intHour.toString().length==1){
      return "0" + intHour.toString();
    }
    else {
      return intHour.toString()
    }
    
  }


  
}
