package laurent.fitness.controller;

import java.util.Date;
import java.util.List;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.adaptater.FacilityAvailableAdaptater;
import laurent.fitness.services.ConvertTimeToStringService;
import laurent.fitness.services.FacilityAvailableAdaptaterService;
import laurent.fitness.services.FacilityCategoryService;
import laurent.fitness.services.TimestampFacilityService;

@RestController
@RequestMapping("/facilitycategoryctrl")
@CrossOrigin("http://localhost:4200")
public class FacilityCategoryController {
	private FacilityCategoryService facilityCategoryService;
	private TimestampFacilityService timestampFacilityService;
	private FacilityAvailableAdaptaterService facilityAvailableAdaptaterService;
	private ConvertTimeToStringService convertTimeToStringService;
	
	public FacilityCategoryController(
			FacilityCategoryService facilityCategoryService,
			TimestampFacilityService timestampFacilityService,
			FacilityAvailableAdaptaterService facilityAvailableAdaptaterService,
			ConvertTimeToStringService convertTimeToStringService
			) {
		this.facilityCategoryService = facilityCategoryService;
		this.timestampFacilityService = timestampFacilityService;
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
	
	@PostMapping("/addfacilitycategory")
	public ResponseEntity<?> addFacilityCategory(@Valid String nameFacilityCategory, @Valid String quantityFacilityCategory,  @Valid String priceFacilityCategory) {
		try {
			FacilityCategory facilityCategory = new FacilityCategory(nameFacilityCategory, Integer.parseInt(quantityFacilityCategory), Float.parseFloat(priceFacilityCategory));
			this.facilityCategoryService.saveFacilityCategory(facilityCategory);
			
		return ResponseEntity.status(HttpStatus.OK).body(null);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// Update a category of facility
		@PutMapping("/updatefacilitycategory")
		public ResponseEntity<?> updateFacilityCategory(
				@Valid String nameFacilityCategory, 
				@Valid String quantityFacilityCategory,
				@Valid String priceFacilityCategory){
			try {
				this.facilityCategoryService.updateFacilityCategory(nameFacilityCategory, quantityFacilityCategory,priceFacilityCategory);
				return ResponseEntity.status(HttpStatus.OK).body(null);
			}  catch(Exception e) {
				System.out.println(e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
			}
		}
	
	// Delete a category of facility
		@DeleteMapping("/delfacilitycategory")
		public ResponseEntity<?> delFacilityCategory(@Valid String facilityCategoryName){
			try {
				this.facilityCategoryService.deleteFacilityCategory(this.facilityCategoryService.findByFacilityCategoryName(facilityCategoryName));
				return ResponseEntity.status(HttpStatus.OK).body(null);
			} catch(Exception e) {
				System.out.println(e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
			}
		}
}

