import { Component, OnInit, ViewChild } from '@angular/core';
import { Facility} from '../../models/facility.model';
import { ManagerService } from '../../services/manager.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';

@Component({
  selector: 'app-facility-listing',
  templateUrl: './facility-listing.component.html',
  styleUrls: ['./facility-listing.component.css']
})

export class FacilityListingComponent implements OnInit {
  nameFacility: string;
  priceSeance: number;
  FacilitiesList: BehaviorSubject<Facility[]>;
  isDataLoaded: boolean = false;

MyDataSource: any;
displayedColumns: string[] = ['Name', 'Price', 'Update'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private managerService: ManagerService,
              private router: Router) { }

  ngOnInit() {
  this.isDataLoaded = false;
  this.RenderDataTable();
  this.managerService.publishFacilities();
  this.FacilitiesList  = this.managerService.listFacilities$;
  this.managerService.isDataLoadedSubject.subscribe(
    (res) => this.isDataLoaded = res
    );
  }

  RenderDataTable() {
    this.managerService.getFacilitiesAdaptater().subscribe(
      res => {
        console.log("res getFacilities : ", res);
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

    onUpdate(idFacility: number) {
      this.router.navigate(['facility-detail/' + idFacility]);
    }

    onMaintenance(idFacility: number){
      this.router.navigate(['facility-maintenance/' + idFacility]);
    }

    onShow(idFacility: number) {

    }

    
    applyFilter(filterValue: string) {
      this.MyDataSource.filter = filterValue.trim().toLowerCase();
    }
}
