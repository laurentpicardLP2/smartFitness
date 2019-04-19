import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ManagerService } from 'src/app/services/manager.service';
import { Room } from 'src/app/models/room.model';
import { BehaviorSubject } from 'rxjs';
import { CustomValidators, ConfirmValidParentMatcher, regExps,  errorMessages} from '../../services/custom-validators.service';
import { RoomValidator } from 'src/app/validators/room.validator';

@Component({
  selector: 'app-room-new',
  templateUrl: './room-new.component.html',
  styleUrls: ['./room-new.component.css']
})
export class RoomNewComponent implements OnInit {

  roomForm: FormGroup;
  listRooms: BehaviorSubject<Room[]>;
  rooms: Room[];
  nameRoom : string;
  capacityRoom: number;
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private httpClient: HttpClient, 
              private formBuilder: FormBuilder,
              private managerService: ManagerService) {
 
  }

  ngOnInit(): void {

    this.managerService.getRooms().subscribe(res => {
      this.rooms = res;
      this.managerService.publishRooms();
      this.listRooms = this.managerService.listRooms$;
    });
    
    this.createForm();
  }
  
  createForm(){
    this.roomForm = this.formBuilder.group({
      nameRoom: ['', [
        Validators.required,
        Validators.minLength(1),
        RoomValidator.nameRoomValidator(this.managerService.listNameRooms)
      ]],
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
    const isValid = !(this.managerService.listRooms.find(room => room.nameRoom === nameRoom))
    return isValid ? null : { checkNameRoom: true };
  }

  checkCapacityRoom(group: FormGroup) {
    let capacityRoom: number;

    capacityRoom = group.get("capacityRoom").value;
    const isValid = (capacityRoom >3 && capacityRoom < 101)
    return isValid ? null : { checkCapacityRoom: true };
}


  


  public onValidate() {
    this.managerService.addRoom(this.nameRoom, this.capacityRoom);
  }
}
