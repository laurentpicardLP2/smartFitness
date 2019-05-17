package laurent.fitness.controller;

import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.services.TimestampFacilityService;

@RestController
@RequestMapping("/timestampfacilityctrl")
@CrossOrigin("http://localhost:4200")
public class TimestampFacilityController {
	private TimestampFacilityService timestampFacilityService;
	
	public TimestampFacilityController(TimestampFacilityService timestampFacilityService) {
		this.timestampFacilityService = timestampFacilityService;
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
			
			Logger logger = Logger.getLogger("Try-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new String("Timestamp already taken"));	
		}			
	}
	
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
