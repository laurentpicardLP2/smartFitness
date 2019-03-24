package laurent.fitness.controller.postman;


import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Authority;
import laurent.fitness.model.User;
import laurent.fitness.services.AuthorityService;
import laurent.fitness.services.CustomerService;
import laurent.fitness.services.StaffService;
import laurent.fitness.services.UserService;
import laurent.fitness.model.Authority;
import laurent.fitness.model.Customer;
import laurent.fitness.model.Staff;
import laurent.fitness.model.User;

@RestController
@RequestMapping("/postman/userctrl")
public class UserControllerPostman {
	
	private AuthorityService authorityService;
	private CustomerService customerService;
	private StaffService staffService;
	private UserService userService;
	
	public UserControllerPostman(
				AuthorityService authorityService, 
				CustomerService customerService,
				StaffService staffService,
				UserService userService) {
		this.authorityService = authorityService;
		this.customerService = customerService;
		this.staffService = staffService;
		this.userService = userService;
	}
	
	//Add a new customer by Postman
	@PostMapping("/addcustomer")
	public ResponseEntity<?> addCustomer(
			@Valid String username, 
			@Valid String fullname, 
			@Valid String password, 
			@Valid String email, 
			@Valid String tel,
			@Valid String dateOfBirthday,
			@Valid String domesticAddress,
			@Valid String domesticCp,
			@Valid String domesticCity,
			@Valid String domesticCountry,
			@Valid String deliveryAddress,
			@Valid String deliveryCp,
			@Valid String deliveryCity,
			@Valid String deliveryCountry) {	
		
		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
			
			try {
				this.authorityService.saveAuthority(new Authority(username, "ROLE_CUSTOMER"));
				this.customerService.saveCustomer(new Customer(this.userService.findByUsernameIdMax(),
					username, fullname, "{bcrypt}" + bcrypt.encode(password), email, tel, new Date(), (byte)1, 
					new SimpleDateFormat("dd/MM/yyyy").parse(dateOfBirthday),
					domesticAddress, domesticCp, domesticCity, domesticCountry,
					deliveryAddress, deliveryCp, deliveryCity, deliveryCountry));
			return ResponseEntity.status(HttpStatus.OK).body(null);
			
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	
	//via Postman - version livrokaz
//	@PostMapping("/adduser")
//	public ResponseEntity<?> addUsers(@Valid String fullName, @Valid String username, @Valid String email, @Valid String password,
//		@Valid String domesticAddress, @Valid String domesticCp, @Valid String domesticCity, @Valid String domesticCountry,
//		@Valid String deliveryAddress, @Valid String deliveryCp, @Valid String deliveryCity, @Valid String deliveryCountry,
//		@Valid String telephone, @Valid String typeRole) {
//		Users users;
//		Authorities authorities;
//		
//		Long userId;
//
//		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
//		
//		userId =  (LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli())/1000;
//		users = new Users(userId, true, fullName, username, email, "{bcrypt}" + bcrypt.encode(password), 
//				domesticAddress, domesticCp, domesticCity, domesticCountry, 
//				deliveryAddress, deliveryCp, deliveryCity, deliveryCountry,
//				telephone, new Date());
//		
//		authorities = new Authorities(typeRole);
//		authorities.setUsers(users);
//		authoritiesRepo.save(authorities);
//		try {
//			//authoritiesRepo.save(authorities);
//			return ResponseEntity.status(HttpStatus.OK).body(null);
//			
//		} catch(Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
//		}	
//				
//	}

	
	
	//Add a new staff member by Postman
	@PostMapping("/addstaff/{role}")
	public ResponseEntity<?> addStaff(
			@Valid String username, 
			@Valid String fullname, 
			@Valid String password, 
			@Valid String email, 
			@Valid String tel,
			@Valid String dayWorking,
			@Valid String hourWorking,
			@PathVariable String role) {			
			try {
			this.authorityService.saveAuthority(new Authority(username, role));
			staffService.saveStaff(new Staff(this.userService.findByUsernameIdMax(),
					username, fullname, password, email, tel, new Date(), (byte)1,
					dayWorking, hourWorking));
			return ResponseEntity.status(HttpStatus.OK).body(null);
			
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// Delete a customer by Postman
	@DeleteMapping("/deluser")
	public ResponseEntity<?> delCustomer(@Valid String username){
		try {
			this.userService.deleteUser(this.userService.findByUsername(username));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	//login process by Postman
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@Valid String username, @Valid String password) {			
			
		try {
			User user = this.userService.findByUsername(username);
		return ResponseEntity.status(HttpStatus.OK).body(user);
			
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}

}
