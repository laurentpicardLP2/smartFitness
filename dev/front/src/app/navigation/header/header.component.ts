import { Authority } from 'src/app/models/authority.model';
import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { CommandService } from 'src/app/services/command.service';
import { Command } from 'src/app/models/command.model';
import { Item } from 'src/app/models/item.model';
import { Router } from '@angular/router';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @Output() public sidenavToggle = new EventEmitter();
  isAuth: boolean;
  public command: Command;
  public listCommandItems: Item []=[];
  public username: string;
  public nbItems: string;
  public authority: Authority
  

  constructor(private loginService: LoginService,
              private commandService: CommandService,
              private bookingService: BookingService,
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

    this.bookingService.listCommandItemsSubject.subscribe(res => {
      this.listCommandItems = res;
    });

    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });

    this.loginService.authoritySubject.subscribe(res => {
      this.authority = res;
      console.log("this.authority : ", this.authority);
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
    console.log("onResetCart()");
    var popup = document.getElementById("cartText");
    popup.classList.toggle("show");
    this.commandService.resetCommand(this.command, this.username);
  }

  public onValidateCart(){
    var popup = document.getElementById("cartText");
    popup.classList.toggle("show");
    let totalCart = 0;
    for(let i=0; i<this.command.items.length; i++){
      totalCart = totalCart + this.command.items[i].price;
    }
    this.command.totalPrice = totalCart;
    this.commandService.validateCommand(this.command);
  }

  public onContinue(){
    var popup = document.getElementById("cartText");
    popup.classList.toggle("show");
  }

  public onHome(){
    this.utilsService.delCommand();
    this.loginService.signOut();
    this.router.navigate(['']);
  }

}


  
