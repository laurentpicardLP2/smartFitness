import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscriptionCategory} from '../../models/subscription-category.model';
import { OffresService } from '../../services/offres.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';

@Component({
  selector: 'app-subscription-category-listing',
  templateUrl: './subscription-category-listing.component.html',
  styleUrls: ['./subscription-category-listing.component.css']
})
export class SubscriptionCategoryListingComponent implements OnInit {

  subscriptionCategoryList: BehaviorSubject<SubscriptionCategory[]>;

MyDataSource: any;
displayedColumns: string[] = ['Name', 'Price', 'Update'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private offresService: OffresService,
              private router: Router) { }

  ngOnInit() {
  this.offresService.publishSubscriptionCategories();
  this.subscriptionCategoryList  = this.offresService.listSubscriptionCategories$;
  this.RenderDataTable();
  }

  RenderDataTable() {
    this.offresService.getSubscriptionCategories().subscribe(
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

    onUpdate(idSubscriptionCategory: number) {
      this.router.navigate(['subscription-category-detail/' + idSubscriptionCategory]);
    }

    onShow(idSubscriptionCategory: number) {
      //this.router.navigate(['subscription-category-detail/' + username]);
    }

    onDelete(idSubscriptionCategory: number, nameSubscription: string){
      
      if(confirm("Confirme-vous la suppression du compte " + nameSubscription + "?")){
        this.offresService.deleteSubscriptionCategory(idSubscriptionCategory);
        setTimeout(() => this.RenderDataTable(), 350);
      }

    }
  
    applyFilter(filterValue: string) {
      this.MyDataSource.filter = filterValue.trim().toLowerCase();
    }

}
