import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommandService } from 'src/app/services/command.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-acknowledgment',
  templateUrl: './acknowledgment.component.html',
  styleUrls: ['./acknowledgment.component.css']
})
export class AcknowledgmentComponent implements OnInit {
  email: string;
  user: User;

  constructor(private route: ActivatedRoute,
              private commandService: CommandService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.email = this.route.snapshot.params.email;
    this.loginService.userSubject.subscribe(
      (res) => {
        console.log("init command after payment validation Ok : ", res);
        this.user = res;
        this.commandService.initCommand(this.user); 
        this.commandService.setListCommandItemsSubject(null); 
      }
    )
    
  }

  

}
