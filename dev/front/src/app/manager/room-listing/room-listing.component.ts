import { Component, OnInit, ViewChild } from '@angular/core';
import { Room} from '../../models/room.model';
import { ManagerService } from '../../services/manager.service';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent, MatSort } from '@angular/material'


@Component({
  selector: 'app-room-listing',
  templateUrl: './room-listing.component.html',
  styleUrls: ['./room-listing.component.css']
})
export class RoomListingComponent implements OnInit {

  roomsList: BehaviorSubject<Room[]>;

  MyDataSource: any;
  displayedColumns: string[] = ['Name', 'Capacity', 'Update'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private route: ActivatedRoute,
              private managerService: ManagerService,
              private router: Router) { }


  ngOnInit() {
    this.managerService.publishRooms();
    this.roomsList  = this.managerService.listRooms$;
    this.RenderDataTable();
  }


  RenderDataTable() {
  this.managerService.getRooms().subscribe(
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

  onShow(idRoom: number) {
    this.router.navigate(['room-detail/' + idRoom]);
  }

  applyFilter(filterValue: string) {
    this.MyDataSource.filter = filterValue.trim().toLowerCase();
  }

}
