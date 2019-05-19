import { UtilsService } from 'src/app/services/utils.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SubscriptionCategory} from '../../models/subscription-category.model';
import { OffresService } from '../../services/offres.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';

@Component({
  selector: 'app-subscription-customer-proposition',
  templateUrl: './subscription-customer-proposition.component.html',
  styleUrls: ['./subscription-customer-proposition.component.css']
})
export class SubscriptionCustomerPropositionComponent implements OnInit {
  subscriptionCategoryList: BehaviorSubject<SubscriptionCategory[]>;

  MyDataSource: any;
  displayedColumns: string[] = ['Name', 'Price', 'Last', 'Subscribe'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  
    constructor(private route: ActivatedRoute,
                private offresService: OffresService,
                private utilsService : UtilsService,
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

      convertIntoFormatLastSubscription(nbLast: number, typeLast: string) {
        return this.utilsService.convertIntoFormatLastSubscription(nbLast, typeLast); 
      }
  
      onSubscribe(idSubscriptionCategory: number, nbLastSubscription: number , typeLastSubscription: string) {
        this.router.navigate(['subscription-customer-new/' + idSubscriptionCategory + '/' + nbLastSubscription + '/' + typeLastSubscription]);
      }
  
      onShow(idSubscriptionCategory: number) {
      }
  
      
}
