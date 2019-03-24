package laurent.fitness.controller.postman;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.services.FacilityService;
import laurent.fitness.services.RoomService;

@RestController
@RequestMapping("/postman/facilityctrl")
public class FacilityControllerPostman {
	
	private FacilityService facilityService;

	public FacilityControllerPostman(FacilityService facilityService) {
		this.facilityService = facilityService;
	}
	
	//Add a new facility
	@PostMapping("/addfacility")
	public ResponseEntity<?> addFacility(
			@Valid String nameFacility, 
			@Valid String nameRoom, 
			@Valid String nameFacilityCategory) {
		try {
			this.facilityService.saveNewFacility(nameFacility, nameRoom, nameFacilityCategory);
		return ResponseEntity.status(HttpStatus.OK).body(null);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// Update a category of facility
	@PutMapping("/updatefacility")
	public ResponseEntity<?> updateFacility(@Valid String facilityName, @Valid String roomName){
		try {
			this.facilityService.updateFacility(facilityName, roomName);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	//Delete facility
	@DeleteMapping("/deletefacility")
	public ResponseEntity<?> deleteFacility(@Valid String facilityName) {
		try {
			this.facilityService.deleteFacility(this.facilityService.findByFacilityName(facilityName));
		return ResponseEntity.status(HttpStatus.OK).body(null);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
}
