import { Command } from 'src/app/models/command.model';
import { LoginService } from 'src/app/services/login.service';
import { CommandService } from 'src/app/services/command.service';
import { SyntheseService } from 'src/app/services/synthese.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material'
import { MatPaginatorModule } from '@angular/material/paginator'
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-command-listing',
  templateUrl: './command-listing.component.html',
  styleUrls: ['./command-listing.component.css']
})
export class CommandListingComponent implements OnInit {
  public username: string;
  public command: Command;
  MyDataSource: any;
  displayedColumns: string[] = ['Date', 'Prix', 'Statut'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
      private commandService: CommandService,
      private loginService: LoginService,
      private syntheseService: SyntheseService,
      private utilsService: UtilsService) { }

  ngOnInit() {
    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });
    this.commandService.commandSubject.subscribe(res => {
      this.command = res;
    });

    this.syntheseService.publishCommandsForAnUser(this.username);
    this.RenderDataTable();
  }

    RenderDataTable() {
    this.syntheseService.getCommandsForAnUser(this.username).subscribe(
      res => {
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource.data = res;
      this.MyDataSource.sort = this.sort;
      this.MyDataSource.paginator = this.paginator;
      console.log(this.MyDataSource.data);
    },
      error => {
      console.log('There was an error !' + error);
      });
    }

    public convertIntoDateTime(pDateOfSeance) {
      return pDateOfSeance = (pDateOfSeance==null) ? "" : this.utilsService.convertIntoDateTimeSeanceListing(pDateOfSeance);
    }

    convertIntoMonetaryFormat(price: number){
      return this.utilsService.convertIntoMonetaryFormat(price);
    } 

    onShow(idCommand: number) {
      this.router.navigate(['command-detail/' + idCommand]);
    }

    applyFilter(filterValue: string) {
      this.MyDataSource.filter = filterValue.trim().toLowerCase();
    }
    

}
