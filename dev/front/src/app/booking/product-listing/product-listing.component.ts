import { UtilsService } from 'src/app/services/utils.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductRef} from '../../models/product-ref.model';
import { ProductService } from '../../services/product.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {

  productList: BehaviorSubject<ProductRef[]>;

  MyDataSource: any;
  displayedColumns: string[] = ['Name', 'Price', 'Image', 'See'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  
    constructor(private route: ActivatedRoute,
                private productService: ProductService,
                private utilsService: UtilsService,
                private router: Router) { }
  
    ngOnInit() {
    this.productService.publishProducts();
    this.productList  = this.productService.listProducts$;
    this.RenderDataTable();
    }
  
    RenderDataTable() {
      this.productService.getProducts().subscribe(
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
  
      onSee(idProductRef: number) {
        this.router.navigate(['product-detail/' + idProductRef]);
      }
  
      onShow(idProductRef: number) {
        //this.router.navigate(['product-ref-detail/' + username]);
      }
    
      applyFilter(filterValue: string) {
        this.MyDataSource.filter = filterValue.trim().toLowerCase();
      }
  
      public convertIntoMonetaryFormat(price: number){
        return this.utilsService.convertIntoMonetaryFormat(price);
      }

}
