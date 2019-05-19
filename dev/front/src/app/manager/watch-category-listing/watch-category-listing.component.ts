import { Component, OnInit, ViewChild } from '@angular/core';
import { WatchCategory} from '../../models/watch-category.model';
import { OffresService } from '../../services/offres.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material';

@Component({
  selector: 'app-watch-category-listing',
  templateUrl: './watch-category-listing.component.html',
  styleUrls: ['./watch-category-listing.component.css']
})
export class WatchCategoryListingComponent implements OnInit {

  watchCategoryList: BehaviorSubject<WatchCategory[]>;

MyDataSource: any;
displayedColumns: string[] = ['Name', 'Price', 'Update'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private offresService: OffresService,
              private router: Router) { }

  ngOnInit() {
  this.offresService.publishWatchCategories();
  this.watchCategoryList  = this.offresService.listWatchCategories$;
  this.RenderDataTable();
  }

  RenderDataTable() {
    this.offresService.getWatchCategories().subscribe(
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

    onUpdate(idWatchCategory: number) {
      this.router.navigate(['watch-category-detail/' + idWatchCategory]);
    }

    onShow(idWatchCategory: number) {
      //this.router.navigate(['watch-category-detail/' + username]);
    }

    onDelete(idWatchCategory: number, nameWatch: string){
      
      if(confirm("Confirme-vous la suppression du modèle " + nameWatch + "?")){
        this.offresService.deleteWatchCategory(idWatchCategory);
        setTimeout(() => this.RenderDataTable(), 350);
      }

    }
  
    applyFilter(filterValue: string) {
      this.MyDataSource.filter = filterValue.trim().toLowerCase();
    }


}
