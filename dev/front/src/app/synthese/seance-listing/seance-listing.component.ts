import { Seance } from 'src/app/models/seance.model';
import { LoginService } from 'src/app/services/login.service';
import { SeanceService } from 'src/app/services/seance.service';
import { SyntheseService } from 'src/app/services/synthese.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material'
import { MatPaginatorModule } from '@angular/material/paginator'
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-seance-listing',
  templateUrl: './seance-listing.component.html',
  styleUrls: ['./seance-listing.component.css']
})
export class SeanceListingComponent implements OnInit {

  public username: string;
  MyDataSource: any;
  displayedColumns: string[] = ['Id', 'Date', 'Nb Activités', 'Prix'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
      private loginService: LoginService,
      private syntheseService: SyntheseService,
      private utilsService: UtilsService) { }

  ngOnInit() {
    this.loginService.usernameSubject.subscribe(res => {
      this.username = res;
    });


    this.syntheseService.publishSeancesForAnUser(this.username);
    this.RenderDataTable();
  }

    RenderDataTable() {
    this.syntheseService.getSeancesForAnUser(this.username).subscribe(
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

    onShow(idItem: number) {
      this.router.navigate(['seance-detail/' + idItem]);
    }


}
