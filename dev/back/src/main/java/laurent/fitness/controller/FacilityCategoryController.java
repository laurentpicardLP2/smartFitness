package laurent.fitness.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.adaptater.FacilityAvailableAdaptater;
import laurent.fitness.services.ConvertTimeToStringService;
import laurent.fitness.services.FacilityAvailableAdaptaterService;

@RestController
@RequestMapping("/facilitycategoryctrl")
@CrossOrigin("http://localhost:4200")
public class FacilityCategoryController {
	private FacilityAvailableAdaptaterService facilityAvailableAdaptaterService;
	private ConvertTimeToStringService convertTimeToStringService;
	
	public FacilityCategoryController(
			FacilityAvailableAdaptaterService facilityAvailableAdaptaterService,
			ConvertTimeToStringService convertTimeToStringService
			) {
		this.facilityAvailableAdaptaterService = facilityAvailableAdaptaterService;
		this.convertTimeToStringService = convertTimeToStringService;
	}
	
	
	
	//Retourne la liste des équipements disponibles pour la tranche horaire timestamp
	@GetMapping("/getfacilitycategoriesavailable/{timestamp}")
	public ResponseEntity<?> getFacilityCategoriesAvailable(@PathVariable Date timestamp) {
		
		List<FacilityAvailableAdaptater> listeFacilitiesAvailable = null;
		try {
			listeFacilitiesAvailable = this.facilityAvailableAdaptaterService.getFacilitiesAvailable(this.convertTimeToStringService.getStringOfTimestamp(timestamp));			
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(listeFacilitiesAvailable);
	}
	
	
}

