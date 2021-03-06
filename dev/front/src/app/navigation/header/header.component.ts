import { Authority } from 'src/app/models/authority.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CommandService } from 'src/app/services/command.service';
import { Command } from 'src/app/models/command.model';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { ReportingService } from 'src/app/services/reporting.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() public sidenavToggle = new EventEmitter();
  isAuth: boolean;
  isAlreadyLeftCartZone: boolean = false;
  public command: Command;
  public listCommandItems: Item []=[];
  public username: string;
  public nbItems: string;
  public authority: string;
  public isSubscribed: boolean;
  

  constructor(private loginService: LoginService,
              private commandService: CommandService,
              private reportingService: ReportingService,
              private utilsService: UtilsService,
              private router: Router) { }

  ngOnInit(){
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
  }


  public onToggleSidenav = () => {
    
    this.sidenavToggle.emit();
  }

  public onToggleCart(){
    var popup = document.getElementById("cartText");
    popup.classList.toggle("show");
  }

  public onResetCart(){
    if(confirm("Confirmez-vous l'opération de vider votre panier ?")){
      this.commandService.resetCommand(this.command, this.username);
    }
  }

  public onSeeCart(){
    this.router.navigate(['cart-composition']);
  }
  

  public onContinue(){
    this.isAlreadyLeftCartZone=true;
    var popup = document.getElementById("cartText");
    popup.classList.toggle("show");
  }

  public onHome(){
    this.router.navigate(['']);
  }

  public onLogout(){
    this.utilsService.isInit = true;
    this.utilsService.delCommand();
    this.loginService.signOut();
    this.router.navigate(['login']);
  }

  public onReportingBooking(){
    this.reportingService.publishDataSetBooking();
  }

  public onReportingRentability(){
    this.reportingService.publishDataSetRentability();
  }

}


  
