import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategory} from '../../models/product-category.model';
import { ProductService } from '../../services/product.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material'

@Component({
  selector: 'app-product-category-listing',
  templateUrl: './product-category-listing.component.html',
  styleUrls: ['./product-category-listing.component.css']
})
export class ProductCategoryListingComponent implements OnInit {
  nameProductCategory: string;
  ProductCategoriesList: BehaviorSubject<ProductCategory[]>;

MyDataSource: any;
displayedColumns: string[] = ['Name', 'Update'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
  this.productService.publishProductCategories();
  this.ProductCategoriesList  = this.productService.listProductCategories$;
  this.RenderDataTable();
  }

  RenderDataTable() {
    this.productService.getProductCategories().subscribe(
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

    onUpdate(idProductCategory: number){
      this.router.navigate(['product-category-detail/' + idProductCategory]);
    }

    onDelete(idProductCategory: number, nameProductCategory: string){
      if(confirm("Confirme-vous la suppression de la catégorie " + nameProductCategory + "?")){
        this.productService.deleteProductCategory(idProductCategory, nameProductCategory);
        setTimeout(() => this.RenderDataTable(), 350);
      }
    }

    onShow(idProductCategory: number) {
    }

    applyFilter(filterValue: string) {
      this.MyDataSource.filter = filterValue.trim().toLowerCase();
    }
}
