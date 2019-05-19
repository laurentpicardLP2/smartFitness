import { UtilsService } from 'src/app/services/utils.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Evenement} from '../../models/evenement.model';
import { EvenementService } from '../../services/evenement.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';

@Component({
  selector: 'app-evenement-listing',
  templateUrl: './evenement-listing.component.html',
  styleUrls: ['./evenement-listing.component.css']
})
export class EvenementListingComponent implements OnInit {
  nameFacility: string;
  priceSeance: number;
  EvenementsList: BehaviorSubject<Evenement[]>;
  isDataLoaded: boolean = false;

MyDataSource: any;
displayedColumns: string[] = ['Title', 'Start', 'End', 'Update'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private evenementService: EvenementService,
              private utilsService: UtilsService,
              private router: Router) { }

  ngOnInit() {
  this.isDataLoaded = false;
  this.RenderDataTable();
  this.evenementService.publishEvenements()
  this.EvenementsList  = this.evenementService.listEvenements$;
  
  }

  RenderDataTable() {
    this.evenementService.getEvenements().subscribe(
      res => {
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource.data = res;
      this.MyDataSource.sort = this.sort;
      this.MyDataSource.paginator = this.paginator;
    },
      error => {
      console.log('There was an error !' + error);
      });
    }

    onUpdate(idEvt: number) {
     this.router.navigate(['evenement-detail/' + idEvt]);
    }

    onDelete(idEvt: number){
      this.evenementService.deleteEvenement(idEvt);
      setTimeout(() => this.RenderDataTable(), 150);
    }

    onShow(idEvt: number) {

    }

    
    applyFilter(filterValue: string) {
      this.MyDataSource.filter = filterValue.trim().toLowerCase();
    }

    public convertIntoDateTime(pDateOfEvt) {
      
      if(pDateOfEvt==null) {
        return "";
      } else {
        return this.utilsService.convertIntoDateTimeListing(pDateOfEvt);
      } 
    }

}
