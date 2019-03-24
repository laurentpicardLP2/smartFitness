package laurent.fitness.controller.postman;

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
import laurent.fitness.services.FacilityAvailableAdaptaterService;
import laurent.fitness.services.FacilityCategoryService;

@RestController
@RequestMapping("/postman/facilitycategoryctrl")
public class FacilityCategoryControllerPostman {
	private FacilityCategoryService facilityCategoryService;
	private FacilityAvailableAdaptaterService facilityAvailableAdaptaterService;
	
	public FacilityCategoryControllerPostman(
			FacilityCategoryService facilityCategoryService,
			FacilityAvailableAdaptaterService facilityAvailableAdaptaterService) {
		this.facilityCategoryService = facilityCategoryService;
		this.facilityAvailableAdaptaterService = facilityAvailableAdaptaterService;
	}
	
	//Return the list if categories facilities available for a timestamp
	@GetMapping("/getfacilitiesavailable/{timestamp}")
	public ResponseEntity<?> getFacilityCategories(@PathVariable String timestamp) {
		List<FacilityAvailableAdaptater> listeFacilitiesAvailable = null;
	
		try {
			//listeFacilitiesAvailable = this.facilityAvailableAdaptaterService.getFacilitiesAvailable(timestamp);			

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
			} catch(Exception e) {
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
