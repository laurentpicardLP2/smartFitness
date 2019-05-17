package laurent.fitness.controller;

import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Authority;
import laurent.fitness.model.Staff;
import laurent.fitness.services.AuthorityService;
import laurent.fitness.services.StaffService;
import laurent.fitness.services.UserService;

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
	public ResponseEntity<Staff> addStaff(@PathVariable String role, @RequestBody Staff newStaff) {

		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
		
		try {
			this.authorityService.saveAuthority(new Authority(newStaff.getUsername(), role));
			
		return ResponseEntity.status(HttpStatus.OK).body(this.staffService.saveStaff(new Staff(this.userService.findByUsernameIdMax(),
				newStaff.getUsername(), newStaff.getFullname(), "{bcrypt}" + bcrypt.encode(newStaff.getPassword()), 
				newStaff.getEmail(), newStaff.getTel(), new Date(), (byte)1)));
		
	} catch(Exception e) {
		
		Logger logger = Logger.getLogger("Try-Catch Erreur");
		logger.log(Level.SEVERE, e.toString());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	@PutMapping("/updatestaff/{role}")
	public ResponseEntity<Staff> updateStaff(@PathVariable String role, @RequestBody Staff staff) {

		try {
		return ResponseEntity.status(HttpStatus.OK).body(this.staffService.updateStaff(staff, role));
		
	} catch(Exception e) {
		
		Logger logger = Logger.getLogger("Try-Catch Erreur");
		logger.log(Level.SEVERE, e.toString());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	@DeleteMapping("/deletestaff/{username}")
	public ResponseEntity<?> delStaff(@PathVariable String username){
		try {
			this.userService.deleteUser(this.userService.findByUsername(username));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	

}
