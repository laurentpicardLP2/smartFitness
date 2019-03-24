package laurent.fitness.controller.postman;

import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import laurent.fitness.model.Room;
import laurent.fitness.services.RoomService;

@RestController
@RequestMapping("/postman/roomctrl")
public class RoomControllerPostman {
	private RoomService roomService;
	
	public RoomControllerPostman(RoomService roomService) {
		this.roomService = roomService;
	}
	
	//Add a new room
	@PostMapping("/addroom")
	public ResponseEntity<?> addRoom(@Valid String nameRoom, @Valid String capacity) {
		try {
			this.roomService.saveRoom(new Room(nameRoom, Integer.parseInt(capacity)));
		return ResponseEntity.status(HttpStatus.OK).body(null);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// Update a room by Postman
	@PutMapping("/updateroom")
	public ResponseEntity<?> updateRoom(@Valid String nameRoom, @Valid String capacity){
		try {
			Room roomToUpdate = this.roomService.findByRoomName(nameRoom);
			roomToUpdate.setCapacity(Integer.parseInt(capacity));
			this.roomService.saveRoom(roomToUpdate);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	// Delete a room by Postman
	@DeleteMapping("/delroom")
	public ResponseEntity<?> delRoom(@Valid String nameRoom){
		try {
			this.roomService.deleteRoom(this.roomService.findByRoomName(nameRoom));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
}
