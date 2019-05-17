package laurent.fitness.controller.postman;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

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
	
	@PostMapping("/addtimestampfacility")
	public ResponseEntity<?> addTimestampFacility(
				@Valid int idItem,
				@Valid String dateOfTimestamp, 
				@Valid String nameFacility, 
				@Valid String nameFacilityCategory) {
		try {
			String[] splitTimeFromDate = dateOfTimestamp.split("T");
			int year = Integer.parseInt(splitTimeFromDate[0].split("-")[0]);
			int month = Integer.parseInt(splitTimeFromDate[0].split("-")[1]);
			int day = Integer.parseInt(splitTimeFromDate[0].split("-")[2]);
			int hour = Integer.parseInt(splitTimeFromDate[1].split(":")[0]);
			int minute = Integer.parseInt(splitTimeFromDate[1].split(":")[1]);
			return ResponseEntity.status(HttpStatus.OK).body(
					this.timestampFacilityService.saveNewTimestampFacility(idItem, new Date(year, month, day, hour, minute, 0), nameFacility, nameFacilityCategory));
			
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
