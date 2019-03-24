package laurent.fitness.controller.postman;

import java.sql.Date;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.services.TimestampFacilityService;

@RestController
@RequestMapping("/postman/timestampfacilityctrl")
public class TimestampFacilityControllerPostman {
	private TimestampFacilityService timestampFacilityService;
	
	public TimestampFacilityControllerPostman(TimestampFacilityService timestampFacilityService) {
		this.timestampFacilityService = timestampFacilityService;
	}
	
	//Add a new timestampFacility
	@SuppressWarnings("deprecation")
	@PostMapping("/addtimestampfacility")
	public ResponseEntity<?> addTimestampFacility(
				@Valid int idItem,
				@Valid String refTimestamp, 
				@Valid String facilityName, 
				@Valid String facilityCategoryName) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(null);
//			return ResponseEntity.status(HttpStatus.OK).body(
//					this.timestampFacilityService.saveNewTimestampFacility(idItem, refTimestamp, facilityName, facilityCategoryName, new Date(2019, 3, 12)));
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	//Check the quantity of available facilities for a timestamp and its category
	@GetMapping("/availablefacilities/{facilityName}/{refTimestamp}")
	public ResponseEntity<?> getQuantityAvailableFacilities(@PathVariable String facilityName, @PathVariable String refTimestamp) {
		try {
			//int nbAvailableFacilities = this.timestampFacilityService.findByFacilityCategoryCount(facilityName, refTimestamp);
			System.out.println("refTimestamp : " + refTimestamp);
			//System.out.println("nbAvailableFacilities : " + nbAvailableFacilities);
		return ResponseEntity.status(HttpStatus.OK).body(null);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
}
