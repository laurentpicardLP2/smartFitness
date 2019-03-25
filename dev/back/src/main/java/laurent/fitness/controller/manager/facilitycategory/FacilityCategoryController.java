//package laurent.fitness.controller.manager.facilitycategory;
//
//import java.io.File;
//import java.io.IOException;
//import java.util.Date;
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
//import laurent.fitness.model.adaptater.FacilityAvailableAdaptater;
//import laurent.fitness.services.ConvertTimeToStringService;
//import laurent.fitness.services.FacilityAvailableAdaptaterService;
//import laurent.fitness.services.FacilityCategoryService;
//import laurent.fitness.services.FacilityService;
//import laurent.fitness.services.RoomService;
//import laurent.fitness.upload.FileInformation;
//import laurent.fitness.upload.exception.UploadFileException;
//
//@RestController
//@RequestMapping("/managerctrl")
//@CrossOrigin("http://localhost:4200")
//public class FacilityCategoryController {
//	private FacilityCategoryService facilityCategoryService;
//	private FacilityAvailableAdaptaterService facilityAvailableAdaptaterService;
//	private ConvertTimeToStringService convertTimeToStringService;
//	
//	public FacilityCategoryController(FacilityCategoryService facilityCategoryService,
//			FacilityAvailableAdaptaterService facilityAvailableAdaptaterService,
//			ConvertTimeToStringService convertTimeToStringService) {
//		this.facilityCategoryService = facilityCategoryService;
//		this.facilityAvailableAdaptaterService = facilityAvailableAdaptaterService;
//		this.convertTimeToStringService = convertTimeToStringService;
//		
//	}
//	
//	//Return the list of categories facilities
//	@GetMapping("/getfacilitycategories")
//	public List<FacilityCategory> getFacilityCategories() {
//		return(this.facilityCategoryService.getAllFacilityCategories());			
//	}
//	
//	//Retourne la liste des équipements disponibles pour la tranche horaire timestamp
//	@GetMapping("/getfacilitycategoriesavailable/{timestamp}")
//	public ResponseEntity<?> getFacilityCategoriesAvailable(@PathVariable Date timestamp) {
//		
//		List<FacilityAvailableAdaptater> listeFacilitiesAvailable = null;
//		try {
//			listeFacilitiesAvailable = this.facilityAvailableAdaptaterService.getFacilitiesAvailable(this.convertTimeToStringService.getStringOfTimestamp(timestamp));			
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		}
//		
//		return ResponseEntity.status(HttpStatus.OK).body(listeFacilitiesAvailable);
//	}
//	
//	
//	// Update a facilityCategory
//	@PutMapping("/updatefacilitycategory/{idFacilityCategory}/{nameFacilityCategory}/{priceFacilityCategory}")
//	public ResponseEntity<?> updateFacilitycategory(@PathVariable Integer idFacilityCategory, @PathVariable String nameFacilityCategory, @PathVariable Float priceFacilityCategory){
//		try {
//			return ResponseEntity.status(HttpStatus.OK).body(this.facilityCategoryService.updateFacilityCategory(idFacilityCategory, nameFacilityCategory, priceFacilityCategory));
//		} catch(Exception e) {
//			System.out.println(e);
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
//		}
//	}
//	
//	
//	/**
//	 * Crée un catégorie d'équipement
//	 * @param nameFacilityCategory
//	 * @param priceFacilityCategory
//	 * @return
//	 */
//	@PostMapping("/addfacilitycategory/{nameFacilityCategory}/{priceFacilityCategory}")
//	public ResponseEntity<?> addFacilityCategory(@PathVariable String nameFacilityCategory, @PathVariable Float priceFacilityCategory) {
//		try {
//			FacilityCategory facilityCategory = new FacilityCategory(nameFacilityCategory, priceFacilityCategory);
//			this.facilityCategoryService.saveFacilityCategory(facilityCategory);
//			
//		return ResponseEntity.status(HttpStatus.OK).body(null);
//		
//		} catch(Exception e) {
//			
//			System.out.println(e);
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
//		}			
//	}
//
//	
//	// upload a file and put it in /home/laurent/node/fitness4200/src/assets/images and memorize its name in DB
//	@PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
//	  public ResponseEntity<FileInformation> uploadFile(
//	      @RequestParam("data") MultipartFile multipartFile
//	  ) throws UploadFileException, IllegalStateException, IOException {
//		
//	    if (multipartFile == null || multipartFile.isEmpty()) {
//	      throw new UploadFileException();
//	    }
//	    multipartFile.transferTo(new File("/home/laurent/node/fitness4200/src/assets/images/facilities/" + multipartFile.getOriginalFilename()));
//	    return new ResponseEntity<>(new FileInformation(multipartFile.getOriginalFilename(), multipartFile.getSize()), HttpStatus.CREATED);
//	  }
//	
//
//}
