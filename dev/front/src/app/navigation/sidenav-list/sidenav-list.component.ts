import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Authority } from 'src/app/models/authority.model';
import { LoginService } from 'src/app/services/login.service';
import { CommandService } from 'src/app/services/command.service';
import { Command } from 'src/app/models/command.model';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();


  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  isAuth: boolean;
  public command: Command;
  public listCommandItems: Item []=[];
  public username: string;
  public nbItems: string;
  public authority: Authority;
  public isSubscribed: boolean;
  

  constructor(private loginService: LoginService,
              private commandService: CommandService,
              private reportingService: ReportingService,
              private utilsService: UtilsService,
              private router: Router) { }

  ngOnInit(){
    console.log("this.authority  ngOnInit : ", this.authority );
    this.loginService.isUserLoggedSubject.subscribe(res => {
      this.isAuth = res;
    });

    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    }); 
    
    this.commandService.nbItemsSubject.subscribe(res => {
      this.nbItems = res;
    });

    this.commandService.listCommandItemsSubject.subscribe(res => {
      this.listCommandItems = res;
    });

    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });

    this.loginService.authoritySubject.subscribe(res => {
      this.authority = res;
    });

  }

  public onAction(nameRouting: string){
    this.router.navigate([nameRouting]);
    this.onSidenavClose();
  }

  public onToggleCart(){
    var popup = document.getElementById("cartText");
    popup.classList.toggle("show");
    this.onSidenavClose();
  }

  public onResetCart(){
    console.log("onResetCart()");
    var popup = document.getElementById("cartText");
    popup.classList.toggle("show");
    this.commandService.resetCommand(this.command, this.username);
    this.onSidenavClose();
  }

  public onValidateCart(){
    var popup = document.getElementById("cartText");
    popup.classList.toggle("show");
    let totalCart = 0;
    for(let i=0; i<this.command.items.length; i++){
      totalCart = totalCart + this.command.items[i].price;
    }
    this.command.totalPrice = totalCart;
    this.commandService.validateCommand(this.command,this.username);
    this.onSidenavClose();
  }

  public onContinue(){
    var popup = document.getElementById("cartText");
    popup.classList.toggle("show");
    this.onSidenavClose();
  }

  public onHome(){
    this.router.navigate(['']);
    this.onSidenavClose();
  }

  public onLogout(){
    this.utilsService.isInit = true;
    this.utilsService.delCommand();
    this.loginService.signOut();
    this.router.navigate(['']);
    this.onSidenavClose();
  }

  public onReportingBooking(){
    this.reportingService.publishDataSetBooking();
  }

  public onReportingRentability(){
    this.reportingService.publishDataSetRentability();
  }


  
}
