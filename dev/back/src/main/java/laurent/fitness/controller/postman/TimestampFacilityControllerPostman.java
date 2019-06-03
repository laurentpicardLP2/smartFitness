package laurent.fitness.controller.postman;

import java.util.Calendar;
import java.util.Date;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.services.TimestampFacilityService;

@RestController
@RequestMapping("/postman/timestampfacilityctrl")
public class TimestampFacilityControllerPostman {
	private TimestampFacilityService timestampFacilityService;
	
	Calendar calendar = Calendar.getInstance();
	
	public TimestampFacilityControllerPostman(TimestampFacilityService timestampFacilityService) {
		this.timestampFacilityService = timestampFacilityService;
	}
	
	
	@SuppressWarnings("deprecation")
	@PostMapping("/addtimestampfacility")
	public ResponseEntity<?> addTimestampFacility(
				@Valid int idItem,
				@Valid String dateOfTimestamp, 
				@Valid String nameFacility, 
				@Valid String nameFacilityCategory) {
		try {

			String[] splitTimeFromDate = dateOfTimestamp.split("T");
			int year = Integer.parseInt(splitTimeFromDate[0].split("-")[0]);
			int month = Integer.parseInt(splitTimeFromDate[0].split("-")[1])-1;
			int day = Integer.parseInt(splitTimeFromDate[0].split("-")[2]);
			int hour = Integer.parseInt(splitTimeFromDate[1].split(":")[0]);
			int minute = Integer.parseInt(splitTimeFromDate[1].split(":")[1]);
			int second = Integer.parseInt(splitTimeFromDate[1].split(":")[2]);
			calendar.set(year, month, day, hour, minute, second); 
			while(calendar.getTime().getTime()%2 == 1) {
				//calendar.set(year, month, day, hour, minute, second);
				calendar.setTime(new Date(year-1900, month, day, hour, minute, 0));
				System.out.println("11111111111111111");
			}
			return ResponseEntity.status(HttpStatus.OK).body(
					this.timestampFacilityService.saveNewTimestampFacility(idItem, calendar.getTime(), nameFacility, nameFacilityCategory));

		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}

	//Check the quantity of available facilities for a timestamp and its category
	@GetMapping("/availablefacilities")
	public ResponseEntity<?> getQuantityAvailableFacilities(@Valid String nameFacilityCategory, @Valid String refTimestamp) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.timestampFacilityService.findByFacilityCategoryCount(nameFacilityCategory, refTimestamp));	
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
}