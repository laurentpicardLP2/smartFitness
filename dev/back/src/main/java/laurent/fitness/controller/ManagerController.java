package laurent.fitness.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Room;
import laurent.fitness.model.SubscriptionCategory;
import laurent.fitness.model.WatchCategory;
import laurent.fitness.services.FacilityCategoryService;
import laurent.fitness.services.FacilityService;
import laurent.fitness.services.FileStorageService;
import laurent.fitness.services.RoomService;
import laurent.fitness.services.SubscriptionCategoryService;
import laurent.fitness.services.WatchCategoryService;
import laurent.fitness.upload.FileInformation;
import laurent.fitness.upload.exception.UploadFileException;

@RestController
@RequestMapping("/managerctrl")
@CrossOrigin("http://localhost:4200")
public class ManagerController {
	 @Autowired
	 private FileStorageService fileStorageService;
	 
	private FacilityService facilityService;
	private FacilityCategoryService facilityCategoryService;
	private RoomService roomService;
	private SubscriptionCategoryService subscriptionCategoryService;
	private WatchCategoryService watchCategoryService;
	
	public ManagerController(FacilityService facilityService, 
							FacilityCategoryService facilityCategoryService, 
							RoomService roomService, 
							SubscriptionCategoryService subscriptionCategoryService,
							WatchCategoryService watchCategoryService) {
		this.facilityService = facilityService;
		this.facilityCategoryService = facilityCategoryService;
		this.roomService = roomService;
		this.subscriptionCategoryService = subscriptionCategoryService;
		this.watchCategoryService = watchCategoryService;
	}
	
	
	//Retourne la liste des équipements
	@GetMapping("/getfacilities")
	public List<Facility> getFacilities() {
		return(this.facilityService.getAllFacilities());			
	}
	
	//Return the list of categories facilities
	@GetMapping("/getfacilitycategories")
	public List<FacilityCategory> getFacilityCategories() {
		return(this.facilityCategoryService.getAllFacilityCategories());			
	}
	
	// Fonction retournant le facilityCategory associé à un facility lorsq'un manager accède à la page de détails d'un facility
	@GetMapping("/getfacilitycategoryassociatetofacility/{idFacility}")
	public FacilityCategory getFacilityCategoryAssociateToFacility(@PathVariable Integer idFacility) {
		return(this.facilityCategoryService.getFacilityCategoryAssociateToFacility(idFacility));			
	}
	
	//Ajoute un facility dans la catégorie idFacilityCategory et la room idRoom + met à jour le nombre d'équipement
	@PostMapping("/addfacility/{idFacilityCategory}/{idRoom}/{nameFacility}/{descriptionFacility}/{imageFacility}/{priceSeance}")

	public ResponseEntity<?> addFacility(
			@PathVariable int idFacilityCategory, 
			@PathVariable int idRoom, 
			@PathVariable String nameFacility,
			@PathVariable String descriptionFacility,
			@PathVariable String imageFacility,
			@PathVariable float priceSeance) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.facilityService.addFacility(idFacilityCategory, idRoom, nameFacility, descriptionFacility, imageFacility, priceSeance));
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// upload a file and put it in /home/laurent/smartFitness/dev/front/src/assets/images and memorize its name in DB
	@PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	  public ResponseEntity<FileInformation> uploadFile(
	      @RequestParam("data") MultipartFile multipartFile
	  ) throws UploadFileException, IllegalStateException, IOException {
		
	    if (multipartFile == null || multipartFile.isEmpty()) {
	      throw new UploadFileException();
	    }
	    
	    this.fileStorageService.storeFile(multipartFile);

	    
	    //multipartFile.transferTo(new File("/home/laurent/smartFitness/dev/front/src/assets/images/facilities/" + multipartFile.getOriginalFilename()));
	    return new ResponseEntity<>(new FileInformation(multipartFile.getOriginalFilename(), multipartFile.getSize()), HttpStatus.CREATED);
	  }
    		 	
	// Update a facility
	@PutMapping("/updatefacility/{idFacility}/{nameFacilityCategory}/{nameRoom}/{nameFacility}/{priceSeance}/{descriptionFacility}/{imageFacility}")
	public ResponseEntity<?> updateFacility(@PathVariable Integer idFacility, @PathVariable String nameFacilityCategory,
			@PathVariable String nameRoom, @PathVariable String nameFacility, @PathVariable Float priceSeance,
			@PathVariable String descriptionFacility, @PathVariable String imageFacility){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.facilityService.updateFacility(idFacility, nameFacilityCategory, nameRoom, nameFacility, priceSeance, descriptionFacility, imageFacility));
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	// Update a facilityCategory
	@PutMapping("/updatefacilitycategory/{idFacilityCategory}/{nameFacilityCategory}/{priceFacilityCategory}") 
	public ResponseEntity<?> updateFacilityCategory(@PathVariable Integer idFacilityCategory, @PathVariable String nameFacilityCategory, @PathVariable Float priceFacilityCategory){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.facilityCategoryService.updateFacilityCategory(idFacilityCategory, nameFacilityCategory, priceFacilityCategory));
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
			
	/**
	 * Crée une catégorie d'équipement
	 * @param nameFacilityCategory
	 * @param priceFacilityCategory
	 * @return
	 */
	@PostMapping("/addfacilitycategory/{nameFacilityCategory}/{priceFacilityCategory}")
	public ResponseEntity<?> addFacilityCategory(@PathVariable String nameFacilityCategory, @PathVariable Float priceFacilityCategory) {
		try {
			FacilityCategory facilityCategory = new FacilityCategory(nameFacilityCategory, priceFacilityCategory);
			this.facilityCategoryService.saveFacilityCategory(facilityCategory);
			
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
	
	
	//Return the list of rooms
	@GetMapping("/getrooms")
	public List<Room> getRooms() {
		return this.roomService.getAllRooms();			
	}
	
	
	// Fonction retournant la room associée à un facility lorsq'un manager accède à la page de détails d'un facility
	@GetMapping("/getroomassociatetofacility/{idFacility}")
	public Room getRoomAssociateToFacility(@PathVariable Integer idFacility) {
		return this.roomService.getRoomAssociateToFacility(idFacility);			
	}

	
	//Add a new room
	@PostMapping("/addroom/{nameRoom}/{capacityRoom}")
	public ResponseEntity<?> addRoom(@PathVariable String nameRoom, @PathVariable Integer capacityRoom) {
		try {
			this.roomService.saveRoom(new Room(nameRoom, capacityRoom));
		return ResponseEntity.status(HttpStatus.OK).body(null);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// Update a room
	@PutMapping("/updateroom/{idRoom}/{nameRoom}/{capacityRoom}")
	public ResponseEntity<?> updateRoom(@PathVariable Integer idRoom, @PathVariable String nameRoom, @PathVariable Integer capacityRoom){
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.roomService.updateRoom(idRoom, nameRoom, capacityRoom));
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}	
	
	//Return the list of subscriptionCategories
	@GetMapping("/getsubscriptioncategories")
	public List<SubscriptionCategory> getSubscriptionCategories() {
		return this.subscriptionCategoryService.getAllSubscriptionCategories();		
	}
	
	
	@PostMapping("/addsubscriptioncategory")
	public ResponseEntity<?> addSubscriptionCategory(@RequestBody SubscriptionCategory pSubscriptionCategory) {
		try {
			SubscriptionCategory subscriptionCategory = new SubscriptionCategory(pSubscriptionCategory.getNameSubscription(), pSubscriptionCategory.getNbLast(), pSubscriptionCategory.getTypeLast(), pSubscriptionCategory.getPriceSubscription());
		return ResponseEntity.status(HttpStatus.OK).body(this.subscriptionCategoryService.saveSubscriptionCategory(subscriptionCategory));
		
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	
	@PutMapping("/updatesubscriptioncategory")
	public ResponseEntity<?> updateSubscriptionCategory(@RequestBody SubscriptionCategory pSubscriptionCategory) {
		try {	
			return ResponseEntity.status(HttpStatus.OK).body(this.subscriptionCategoryService.updateSubscriptionCategory(pSubscriptionCategory.getIdSubscriptionCategory(), pSubscriptionCategory.getNameSubscription(), pSubscriptionCategory.getNbLast(), pSubscriptionCategory.getTypeLast(), pSubscriptionCategory.getPriceSubscription()));
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}

	
	// Delete a category of subscription
	@DeleteMapping("/delsubscriptioncategory/{idSubscriptionCategory}")
	public ResponseEntity<?> delSubscriptionCategory(@PathVariable Integer idSubscriptionCategory){
		try {
			this.subscriptionCategoryService.deleteSubscriptionCategory(this.subscriptionCategoryService.findByIdSubscriptionCategory(idSubscriptionCategory));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	//Retourne la liste des modèles de montres
	@GetMapping("/getwatchcategories")
	public List<WatchCategory> getWatchCategories() {
		return this.watchCategoryService.getAllWatchCategories();
		//return this.subscriptionCategoryService.getAllSubscriptionCategories();		
	}
	
	@PostMapping("/addwatchcategory/{nameWatch}/{priceWatch}/{descriptionWatch}/{imageWatch}")
	public ResponseEntity<?> addWatchCategory(@PathVariable String nameWatch, @PathVariable Float priceWatch, @PathVariable String descriptionWatch, @PathVariable String imageWatch) {
		try {
			WatchCategory watchCategory = new WatchCategory(nameWatch, priceWatch, descriptionWatch, imageWatch);
		return ResponseEntity.status(HttpStatus.OK).body(this.watchCategoryService.saveWatchCategory(watchCategory));
		
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	@PutMapping("/updatewatchcategory/{idWatchCategory}/{nameWatch}/{priceWatch}/{descriptionWatch}/{imageWatch}")
	public ResponseEntity<?> updateWatchCategory(@PathVariable Integer idWatchCategory, @PathVariable String nameWatch, @PathVariable Float priceWatch, @PathVariable String descriptionWatch, @PathVariable String imageWatch) {
		try {	
			return ResponseEntity.status(HttpStatus.OK).body(this.watchCategoryService.updateWatchCategory(idWatchCategory, nameWatch, priceWatch, descriptionWatch, imageWatch));
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// Supprime un modèle de montre 
	@DeleteMapping("/delwatchcategory/{idWatchCategory}")
	public ResponseEntity<?> delWatchCategory(@PathVariable Integer idWatchCategory){
		try {
			this.watchCategoryService.deleteWatchCategory(this.watchCategoryService.findByIdWatchCategory(idWatchCategory));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}


}
