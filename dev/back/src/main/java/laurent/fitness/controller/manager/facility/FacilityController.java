//package laurent.fitness.controller.manager.facility;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.List;
//
//import javax.validation.Valid;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.multipart.MultipartFile;
//
//import laurent.fitness.model.Facility;
//import laurent.fitness.model.FacilityCategory;
//import laurent.fitness.model.Room;
//import laurent.fitness.services.FacilityCategoryService;
//import laurent.fitness.services.FacilityService;
//import laurent.fitness.services.RoomService;
//import laurent.fitness.upload.FileInformation;
//import laurent.fitness.upload.exception.UploadFileException;
//
//@RestController
//@RequestMapping("/managerctrl")
//@CrossOrigin("http://localhost:4200")
//public class FacilityController {
//	private FacilityService facilityService;
//	private FacilityCategoryService facilityCategoryService;
//	
//	public FacilityController(FacilityService facilityService, FacilityCategoryService facilityCategoryService) {
//		this.facilityService = facilityService;
//		this.facilityCategoryService = facilityCategoryService;
//	}
//
//	
//	//Retourne la liste des équipements
//	@GetMapping("/getfacilities")
//	public List<Facility> getFacilities() {
//		return(this.facilityService.getAllFacilities());			
//	}
//	
//	//Ajoute un facility dans la catégorie idFacilityCategory et la room idRoom + met à jour le nombre d'équipement
//	@PostMapping("/addfacility/{idFacilityCategory}/{idRoom}/{nameFacility}/{descriptionFacility}/{imageFacility}/{priceSeance}")
//
//	public ResponseEntity<?> addFacility(
//			@PathVariable int idFacilityCategory, 
//			@PathVariable int idRoom, 
//			@PathVariable String nameFacility,
//			@PathVariable String descriptionFacility,
//			@PathVariable String imageFacility,
//			@PathVariable float priceSeance) {
//		try {
//			return ResponseEntity.status(HttpStatus.OK).body(this.facilityService.addFacility(idFacilityCategory, idRoom, nameFacility, descriptionFacility, imageFacility, priceSeance));
//		} catch(Exception e) {
//			System.out.println(e);
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
//		}			
//	}
//	
//	// Update a facilityCategory
//	@PutMapping("/updatefacility/{idFacility}/{nameFacility}/{priceSeance}")
//	public ResponseEntity<?> updateFacilitycategory(@PathVariable Integer idFacility, @PathVariable String nameFacility, @PathVariable Float priceSeance){
//		try {
//			return ResponseEntity.status(HttpStatus.OK).body(this.facilityService.updateFacility(idFacility, nameFacility, priceSeance));
//		} catch(Exception e) {
//			System.out.println(e);
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
//		}
//	}
//
//	
//}
