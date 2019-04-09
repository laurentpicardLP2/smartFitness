import { Component, OnInit, ViewChild } from '@angular/core';
import { FacilityCategory} from '../../models/facility-category.model';
import { ManagerService } from '../../services/manager.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material'


@Component({
  selector: 'app-facility-category-listing',
  templateUrl: './facility-category-listing.component.html',
  styleUrls: ['./facility-category-listing.component.css']
})
export class FacilityCategoryListingComponent implements OnInit {
  nameFacilityCategory: string;
  FacilityCategoriesList: BehaviorSubject<FacilityCategory[]>;

MyDataSource: any;
displayedColumns: string[] = ['Name', 'Update'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private managerService: ManagerService,
              private router: Router) { }

  ngOnInit() {
  this.managerService.publishFacilityCategories();
  this.FacilityCategoriesList  = this.managerService.listFacilityCategories$;
  this.RenderDataTable();
  }

  RenderDataTable() {
    this.managerService.getFacilityCategories().subscribe(
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

    onShow(idFacilityCategory: number) {
      this.router.navigate(['facility-category-detail/' + idFacilityCategory]);
    }

    applyFilter(filterValue: string) {
      this.MyDataSource.filter = filterValue.trim().toLowerCase();
    }
    

}

