import { Component, OnInit, ViewChild } from '@angular/core';
import { Staff } from '../../models/staff.model';
import { AdminService } from '../../services/admin.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material'


@Component({
  selector: 'app-staff-listing',
  templateUrl: './staff-listing.component.html',
  styleUrls: ['./staff-listing.component.css']
})
export class StaffListingComponent implements OnInit {

  fullname: string;
  username: string;
  staffList: BehaviorSubject<Staff[]>;

MyDataSource: any;
displayedColumns: string[] = ['Fullname', 'Username', 'Update', 'Delete'];
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;


  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private router: Router) { }

  ngOnInit() {
  this.adminService.publishStaff();
  this.staffList  = this.adminService.listStaff$;
  this.RenderDataTable();
  }

  RenderDataTable() {
    this.adminService.getStaff().subscribe(
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

    onUpdate(username: string) {
      this.router.navigate(['staff-detail/' + username]);
    }

    onShow(username: string) {
      //this.router.navigate(['staff-detail/' + username]);
    }

    onDelete(username: string){
      
      if(confirm("Confirmez-vous la suppression du compte " + username + "?")){
        this.adminService.delete(username);
        setTimeout(() => this.RenderDataTable(), 300);
      }

    }

  applyFilter(filterValue: string) {
    this.MyDataSource.filter = filterValue.trim().toLowerCase();
  }

}
