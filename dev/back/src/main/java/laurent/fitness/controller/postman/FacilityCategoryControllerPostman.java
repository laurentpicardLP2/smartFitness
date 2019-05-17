package laurent.fitness.controller.postman;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

@RestController
@RequestMapping("/postman/facilitycategoryctrl")
public class FacilityCategoryControllerPostman {
	private FacilityCategoryService facilityCategoryService;
	private FacilityAvailableAdaptaterService facilityAvailableAdaptaterService;
	private ConvertTimeToStringService convertTimeToStringService;
	
	public FacilityCategoryControllerPostman(
			FacilityCategoryService facilityCategoryService,
			FacilityAvailableAdaptaterService facilityAvailableAdaptaterService,
			ConvertTimeToStringService convertTimeToStringService) {
		this.facilityCategoryService = facilityCategoryService;
		this.facilityAvailableAdaptaterService = facilityAvailableAdaptaterService;
		this.convertTimeToStringService = convertTimeToStringService;
	}
	
	//Return the list if categories facilities available for a timestamp
	@GetMapping("/getfacilitiesavailable")
	public ResponseEntity<?> getFacilityCategories(@Valid String dateOfTimestamp) {
		System.out.println("dateOfTimestamp : " + dateOfTimestamp);
		List<FacilityAvailableAdaptater> listeFacilitiesAvailable = null;
		String[] splitTimeFromDate = dateOfTimestamp.split("T");
		int year = Integer.parseInt(splitTimeFromDate[0].split("-")[0]);
		int month = Integer.parseInt(splitTimeFromDate[0].split("-")[1]);
		int day = Integer.parseInt(splitTimeFromDate[0].split("-")[2]);
		int hour = Integer.parseInt(splitTimeFromDate[1].split(":")[0]);
		int minute = Integer.parseInt(splitTimeFromDate[1].split(":")[1]);
		
		try {
			listeFacilitiesAvailable = this.facilityAvailableAdaptaterService.getFacilitiesAvailable(this.convertTimeToStringService.getStringOfTimestamp(new Date(year, month, day, hour, minute, 0)));			

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(listeFacilitiesAvailable);
	}
		
	
	//Return the list of category facilities
	@GetMapping("/getfacilitycategories")
	public ResponseEntity<?> getFacilityCategories() {
		List<FacilityCategory> listeFacilityCategories = null;
		
		try {
			listeFacilityCategories = this.facilityCategoryService.getAllFacilityCategories();			

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(listeFacilityCategories);
	}
	
	//Return the list of available facilities for a category and a timestamp
	@GetMapping("/getavailablefacilites")
	public ResponseEntity<?> getFacilitiesAvailable() {
		List<FacilityCategory> listeFacilityCategories = null;

		try {
			listeFacilityCategories = this.facilityCategoryService.getAllFacilityCategories();			

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		}
		return ResponseEntity.status(HttpStatus.OK).body(listeFacilityCategories);
	}
	
	//Add a new category of facility
	@PostMapping("/addfacilitycategory")
	public ResponseEntity<?> addFacilityCategory(@Valid String nameFacilityCategory) {
		try {
			FacilityCategory facilityCategory = new FacilityCategory(nameFacilityCategory);
			this.facilityCategoryService.saveFacilityCategory(facilityCategory);
			
		return ResponseEntity.status(HttpStatus.OK).body(null);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	@PutMapping("/updatefacilitycategory/{idFacilityCategory}/{nameFacilityCategory}") 
	public ResponseEntity<?> updateFacilityCategory(@PathVariable Integer idFacilityCategory, @PathVariable String nameFacilityCategory){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.facilityCategoryService.updateFacilityCategory(idFacilityCategory, nameFacilityCategory));
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	// Update a category of facility
		@PutMapping("/updatefacilitycategory")
		public ResponseEntity<?> updateFacilityCategory(
				@Valid String idFacilityCategory,
				@Valid String nameFacilityCategory) {
			try {
				return ResponseEntity.status(HttpStatus.OK).body(this.facilityCategoryService.updateFacilityCategory(Integer.parseInt(idFacilityCategory), nameFacilityCategory));
			} catch(Exception e) {
				System.out.println(e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
			}
		}
	
	// Delete a category of facility
		@DeleteMapping("/delfacilitycategory")
		public ResponseEntity<?> delFacilityCategory(@Valid String nameFacilityCategory){
			try {
				this.facilityCategoryService.deleteFacilityCategory(this.facilityCategoryService.findByFacilityCategoryName(nameFacilityCategory));
				return ResponseEntity.status(HttpStatus.OK).body(null);
			} catch(Exception e) {
				System.out.println(e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
			}
		}
}
