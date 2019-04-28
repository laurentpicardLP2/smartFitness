import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductRef} from '../../models/product-ref.model';
import { ProductService } from '../../services/product.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';

@Component({
  selector: 'app-product-ref-listing',
  templateUrl: './product-ref-listing.component.html',
  styleUrls: ['./product-ref-listing.component.css']
})
export class ProductRefListingComponent implements OnInit {


productRefList: BehaviorSubject<ProductRef[]>;

MyDataSource: any;
displayedColumns: string[] = ['Name', 'Price', 'Update'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
  this.productService.publishProductRefs();
  this.productRefList  = this.productService.listProductRefs$;
  this.RenderDataTable();
  }

  RenderDataTable() {
    this.productService.getProductRefs().subscribe(
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

    onUpdate(idProductRef: number) {
      this.router.navigate(['product-ref-detail/' + idProductRef]);
    }

    onShow(idProductRef: number) {
      //this.router.navigate(['product-ref-detail/' + username]);
    }

    onDelete(idProductRef: number, nameProductRef: string){
      
      if(confirm("Confirme-vous la suppression de la référence " + nameProductRef + "?")){
        this.productService.deleteProductRef(idProductRef);
        setTimeout(() => this.RenderDataTable(), 350);
      }

    }
  
    applyFilter(filterValue: string) {
      this.MyDataSource.filter = filterValue.trim().toLowerCase();
    }

}
