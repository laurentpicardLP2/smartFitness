package laurent.fitness.controller.manager.room;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Room;
import laurent.fitness.services.FacilityCategoryService;
import laurent.fitness.services.FacilityService;
import laurent.fitness.services.RoomService;
import laurent.fitness.upload.FileInformation;
import laurent.fitness.upload.exception.UploadFileException;

@RestController
@RequestMapping("/managerctrl")
@CrossOrigin("http://localhost:4200")
public class RoomController {
	private RoomService roomService;
	
	public RoomController(RoomService roomService) {
		this.roomService = roomService;
	}
	
	//Return the list of rooms
	@GetMapping("/getrooms")
	public List<Room> getRooms() {
		return this.roomService.getAllRooms();			
	}

	
	//Add a new room
	@PostMapping("/addroom/{nameRoom}/{capacityRoom}")
	public ResponseEntity<?> addRoom(@PathVariable String nameRoom, @PathVariable Integer capacityRoom) {
		try {
			this.roomService.saveRoom(new Room(nameRoom, capacityRoom));
		return ResponseEntity.status(HttpStatus.OK).body(null);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// Update a room
	@PutMapping("/updateroom/{idRoom}/{nameRoom}/{capacityRoom}")
	public ResponseEntity<?> updateRoom(@PathVariable Integer idRoom, @PathVariable String nameRoom, @PathVariable Integer capacityRoom){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.roomService.updateRoom(idRoom, nameRoom, capacityRoom));
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
}
