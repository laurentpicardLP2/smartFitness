package laurent.fitness.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Room;
import laurent.fitness.services.FacilityCategoryService;
import laurent.fitness.services.FacilityService;
import laurent.fitness.services.RoomService;
import laurent.fitness.upload.FileInformation;
import laurent.fitness.upload.exception.UploadFileException;

@RestController
@RequestMapping("/managerctrl")
@CrossOrigin("http://localhost:4200")
public class ManagerController {
	private FacilityService facilityService;
	private FacilityCategoryService facilityCategoryService;
	private RoomService roomService;
	
	public ManagerController(FacilityService facilityService, FacilityCategoryService facilityCategoryService, RoomService roomService) {
		this.facilityService = facilityService;
		this.facilityCategoryService = facilityCategoryService;
		this.roomService = roomService;
	}
	
	//Return the list of rooms
	@GetMapping("/getrooms")
	public List<Room> getRooms() {
		return this.roomService.getAllRooms();			
	}
	
	//Return the list of categories facilities
	@GetMapping("/getfacilitycategories")
	public List<FacilityCategory> getFacilityCategories() {
		return(this.facilityCategoryService.getAllFacilityCategories());			
	}
	
	// upload a file and put it in /home/laurent/node/fitness4200/src/assets/images and memorize its name in DB
	@PostMapping(value = "/upload", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	  public ResponseEntity<FileInformation> uploadFile(
	      @RequestParam("data") MultipartFile multipartFile
	  ) throws UploadFileException, IllegalStateException, IOException {
		
	    if (multipartFile == null || multipartFile.isEmpty()) {
	      throw new UploadFileException();
	    }
	    multipartFile.transferTo(new File("/home/laurent/node/fitness4200/src/assets/images/facilities/" + multipartFile.getOriginalFilename()));
	    return new ResponseEntity<>(new FileInformation(multipartFile.getOriginalFilename(), multipartFile.getSize()), HttpStatus.CREATED);
	  }
	
	//Ajoute un facility dans la catégorie idFacilityCategory et la room idRoom + met à jour le nombre d'équipement
	@PostMapping("/addfacility/{idFacilityCategory}/{idRoom}/{nameFacility}/{descriptionFacility}/{imageFacility}")

	public ResponseEntity<?> addFacility(
			@PathVariable int idFacilityCategory, 
			@PathVariable int idRoom, 
			@PathVariable String nameFacility,
			@PathVariable String descriptionFacility,
			@PathVariable String imageFacility) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.facilityService.addFacility(idFacilityCategory, idRoom, nameFacility, descriptionFacility, imageFacility));
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
}
