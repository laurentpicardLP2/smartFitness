package laurent.fitness.controller;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import laurent.fitness.model.Authority;
import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Room;
import laurent.fitness.model.Staff;
import laurent.fitness.services.AuthorityService;
import laurent.fitness.services.CustomerService;
import laurent.fitness.services.FacilityCategoryService;
import laurent.fitness.services.FacilityService;
import laurent.fitness.services.RoomService;
import laurent.fitness.services.StaffService;
import laurent.fitness.services.UserService;
import laurent.fitness.upload.FileInformation;
import laurent.fitness.upload.exception.UploadFileException;

@RestController
@RequestMapping("/adminctrl")
@CrossOrigin("http://localhost:4200")
public class AdminController {
	
	private AuthorityService authorityService;
	private StaffService staffService;
	private UserService userService;
	
	public AdminController(
			AuthorityService authorityService, 
			StaffService staffService,
			UserService userService) {
	this.authorityService = authorityService;
	this.staffService = staffService;
	this.userService = userService;
}
	
	@GetMapping("/getstaff")
	public List<Staff> getStaff(){
		return this.staffService.getAllStaff();
	}
	
	@PostMapping("/newstaff/{role}")
	public ResponseEntity<?> addStaff(@PathVariable String role, @RequestBody Staff newStaff) {

		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		
		try {
			this.authorityService.saveAuthority(new Authority(newStaff.getUsername(), role));
			
		return ResponseEntity.status(HttpStatus.OK).body(this.staffService.saveStaff(new Staff(this.userService.findByUsernameIdMax(),
				newStaff.getUsername(), newStaff.getFullname(), "{bcrypt}" + bcrypt.encode(newStaff.getPassword()), 
				newStaff.getEmail(), newStaff.getTel(), new Date(), (byte)1)));
		
	} catch(Exception e) {
		
		System.out.println(e);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	@DeleteMapping("/delstaff/{username}")
	public ResponseEntity<?> delStaff(@PathVariable String username){
		try {
			this.userService.deleteUser(this.userService.findByUsername(username));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	

}
