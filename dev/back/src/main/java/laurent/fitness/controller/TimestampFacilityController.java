package laurent.fitness.controller;

import java.util.Date;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.services.ConvertTimeToStringService;
import laurent.fitness.services.TimestampFacilityService;

@RestController
@RequestMapping("/timestampfacilityctrl")
@CrossOrigin("http://localhost:4200")
public class TimestampFacilityController {
	private TimestampFacilityService timestampFacilityService;
	private ConvertTimeToStringService convertTimeToStringService;
	
	public TimestampFacilityController(TimestampFacilityService timestampFacilityService,
			ConvertTimeToStringService convertTimeToStringService) {
		this.timestampFacilityService = timestampFacilityService;
		this.convertTimeToStringService = convertTimeToStringService;
	}
	
	//Add a new timestampFacility
	@PostMapping("/addtimestampfacility/{idItem}/{dateOfTimestamp}/{nameFacility}/{nameFacilityCategory}")
	public ResponseEntity<?> addTimestampFacility(
			@PathVariable int idItem,
			@PathVariable Date dateOfTimestamp, 
			@PathVariable String nameFacility, 
			@PathVariable String nameFacilityCategory) {
		try {
		return ResponseEntity.status(HttpStatus.OK).body(
				this.timestampFacilityService.saveNewTimestampFacility(idItem, dateOfTimestamp, nameFacility, nameFacilityCategory));
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	//Check the quantity of available facilities for a timestamp and its category
//	@GetMapping("/availablefacilities/{facilityName}/{dateOfTimestamp}")
//	public ResponseEntity<?> getQuantityAvailableFacilities(@PathVariable String facilityName, @PathVariable Date dateOfTimestamp) {
//		try {
//			int nbAvailableFacilities = this.timestampFacilityService.findByFacilityCategoryCount(facilityName, this.convertTimeToStringService.getStringOfTimestamp(dateOfTimestamp));
//		return ResponseEntity.status(HttpStatus.OK).body(null);
//		
//		} catch(Exception e) {
//			
//			System.out.println(e);
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
//		}			
//	}
	
	@DeleteMapping("/deletetimestampfacility/{idTimestampFacillity}")
	public ResponseEntity<?> delTimestamp(@PathVariable String idTimestampFacillity){
		try {
			this.timestampFacilityService.deleteTimestampFacility(Integer.parseInt(idTimestampFacillity));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
}
