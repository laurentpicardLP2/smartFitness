import { UtilsService } from 'src/app/services/utils.service';
import { LoginService } from 'src/app/services/login.service';
import { TimestampFacilityAdaptater } from 'src/app/models/timestamp-facility-adaptater.model';
import { SyntheseService } from 'src/app/services/synthese.service';
import { Command } from 'src/app/models/command.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-command-detail',
  templateUrl: './command-detail.component.html',
  styleUrls: ['./command-detail.component.css']
})
export class CommandDetailComponent implements OnInit {
  username: string;
  idCommand: number;
  commandObs: Observable<Command>
  timstampFacilitiesList: BehaviorSubject<TimestampFacilityAdaptater[]>;
  command: Command;
  

  constructor(private route: ActivatedRoute,
              private syntheseService: SyntheseService,
              private loginService: LoginService,
              private utilsService: UtilsService,
              private router: Router) { }

  ngOnInit() {
    this.idCommand = +this.route.snapshot.params.idCommand;
    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
      this.syntheseService.findCommand(this.idCommand, this.username).subscribe(
        (command) => this.command = command
      );
      
    });

  }

  public convertIntoDateTime(pDateOfSeance) {
    return pDateOfSeance = (pDateOfSeance==null) ? "" : this.utilsService.convertIntoDateTimeListing(pDateOfSeance);
  }

  convertIntoMonetaryFormat(price: number){
    return this.utilsService.convertIntoMonetaryFormat(price);
  } 

  public getTopicName(nameTypeItem: string){
    return nameTypeItem.split(":")[0];
  }

  public getTypeItem(nameTypeItem: string){
    return nameTypeItem.split(":")[1];
    
  }

  getIdWatchCategory(typeItemWatch: string){
    return parseInt(typeItemWatch.split(":")[2], 10);
  }


}
