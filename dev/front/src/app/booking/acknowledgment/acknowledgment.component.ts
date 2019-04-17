import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommandService } from 'src/app/services/command.service';
import { User } from 'src/app/models/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-acknowledgment',
  templateUrl: './acknowledgment.component.html',
  styleUrls: ['./acknowledgment.component.css']
})
export class AcknowledgmentComponent implements OnInit {
  email: string;
  user: User;
  idCommand: number;
  totalPrice: number;
  username: string;
  fullname: string;

  constructor(private route: ActivatedRoute,
              private commandService: CommandService,
              private loginService: LoginService,
              private utilsService: UtilsService) { }

  ngOnInit() {
    this.email = this.route.snapshot.params.email;
    this.idCommand = +this.route.snapshot.params.idCommand;
    this.totalPrice = +this.route.snapshot.params.totalPrice;
    this.username = this.route.snapshot.params.username;
    this.fullname = this.route.snapshot.params.fullname;

    this.loginService.userSubject.subscribe(
      (res) => {
        console.log("init command after payment validation Ok : ", res);
        this.user = res;
        this.commandService.initCommand(this.username, false); 
        this.commandService.setListCommandItemsSubject(null); 
      }
    )
    
  }

  public convertFormatMonetary(amount: number){
    return this.utilsService.convertIntoMonetaryFormat(amount);
  }

  

}
