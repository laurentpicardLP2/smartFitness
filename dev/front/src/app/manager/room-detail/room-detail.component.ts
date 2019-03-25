import { ManagerService } from 'src/app/services/manager.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Room } from 'src/app/models/room.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  idRoom: number;
  nameRoom: string;
  nameRoomInit: string;
  capacityRoom: number;
  roomForm: FormGroup;
  listRooms: BehaviorSubject<Room[]>;
  rooms: Room[];
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private managerService: ManagerService,
              private router: Router) { }

  ngOnInit() {
    this.idRoom = +this.route.snapshot.params.idRoom;
    this.managerService.publishRooms();
    this.managerService.findRoom(this.idRoom).subscribe(room => {
      this.idRoom = room.idRoom;
      this.nameRoom = room.nameRoom;
      this.nameRoomInit = room.nameRoom;
      this.capacityRoom = room.capacityRoom;
    });
    this.createForm();
  }


  createForm(){
    this.roomForm = this.formBuilder.group({
      nameRoomGroup: this.formBuilder.group({
        nameRoom: ['', [
          Validators.required,
          Validators.minLength(1),
        ]]
      }, {validator: this.checkNameRoom.bind(this)}),
      capacityRoomGroup: this.formBuilder.group({
        capacityRoom: ['', [
          Validators.required,
        ]]
      }, {validator: this.checkCapacityRoom.bind(this)}),
    }); 
  }

  checkNameRoom(group: FormGroup){
    let nameRoom : string;
    
    nameRoom = group.get("nameRoom").value;
    const isValid = !((this.managerService.listRooms.find(room => room.nameRoom === nameRoom) && nameRoom != this.nameRoomInit));
    return isValid ? null : { checkNameRoom: true };
  }

  checkCapacityRoom(group: FormGroup) {
    let capacityRoom: number;

    capacityRoom = group.get("capacityRoom").value;
    const isValid = (capacityRoom >3 && capacityRoom < 101)
    return isValid ? null : { checkCapacityRoom: true };
}

  public onUpdate() {
    this.managerService.updateRoom(this.idRoom, this.nameRoom, this.capacityRoom);
  }

}
