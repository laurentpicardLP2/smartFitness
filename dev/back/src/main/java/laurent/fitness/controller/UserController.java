package laurent.fitness.controller;


import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.AuthToken;
import laurent.fitness.model.Authority;
import laurent.fitness.model.Customer;
import laurent.fitness.security.IAuthenticationFacade;
import laurent.fitness.security.JwtTokenProvider;
import laurent.fitness.services.AuthorityService;
import laurent.fitness.services.CustomerService;
import laurent.fitness.services.UserService;

@RestController
@RequestMapping("/userctrl")
@CrossOrigin("http://localhost:4200")
public class UserController {
		
	@Autowired
	AuthenticationManager authenticationManager;
		
	@Autowired 
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
    private IAuthenticationFacade authenticationFacade;
	
	private AuthorityService authorityService;
	private CustomerService customerService;
	private UserService userService;
	
	public UserController(
				AuthorityService authorityService, 
				CustomerService customerService,
				UserService userService) {
		this.authorityService = authorityService;
		this.customerService = customerService;
		this.userService = userService;
	}
	
	/**
	 * Appel de la fonction lorqu'un nouvel utilisteur a remplit le formulaire d'inscription
	 * @param newCustomer: Fiche du nouvel utilisateur procédant à l'inscription
	 * @return: retourne un objet Customer correspondant à la fiche d'un nouvel utilisateur
	 */
	
	@PostMapping("/newcustomer")
	public ResponseEntity<Customer> createCustomer(@RequestBody Customer newCustomer) {

		BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
				
		try {
			this.authorityService.saveAuthority(new Authority(newCustomer.getUsername(), "ROLE_CUSTOMER"));
			Customer customer = new Customer(this.userService.findByUsernameIdMax(),
					newCustomer.getUsername(), newCustomer.getFullname(), "{bcrypt}" + bcrypt.encode(newCustomer.getPassword()), 
					newCustomer.getEmail(), newCustomer.getTel(), new Date(), (byte)1, newCustomer.getDateOfBirthday(),
					newCustomer.getDomesticAddress(), newCustomer.getDomesticCp(), newCustomer.getDeliveryCity(), newCustomer.getDomesticCountry(),
					newCustomer.getDeliveryAddress(), newCustomer.getDeliveryCp(), newCustomer.getDeliveryCity(), newCustomer.getDeliveryCountry());
			this.customerService.saveCustomer(customer);
			return ResponseEntity.status(HttpStatus.OK).body(customer);
		
	} catch(Exception e) {
		
		Logger logger = Logger.getLogger("Try-Catch Erreur");
		logger.log(Level.SEVERE, e.toString());
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
		
	
	@DeleteMapping("/deluser")
	public ResponseEntity<?> delCustomer(@Valid String username){
		try {
			this.userService.deleteUser(this.userService.findByUsername(username));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	
	/**
	 * Fonction exécutée à la connexion d'un utilisateur. 
	 * @return: Retourne un token valable pour une session stateless
	 */
	@PostMapping("/login")
	public ResponseEntity<AuthToken> authenticateUser(){
        Authentication authentication = authenticationFacade.getAuthentication();
        return ResponseEntity.ok(jwtTokenProvider.generateToken(authentication, this.userService.findByUsername(authentication.getName()), this.userService));
	}
	
	@GetMapping("/authority/{username}")
	public ResponseEntity<Authority> authorityOfUser (@PathVariable String username){
		
		Authority authority = this.userService.getAuthorityForAnUser(username);
		return ResponseEntity.ok(authority);
	}
	
	/**
	 * 
	 * Permet lors du signup d'un nouvel utilisateur de contrôler l'unicité du champ username
	 * @return: retourne la liste des username (username). getAuthentication()
	 */
	
	@GetMapping("/usernames")
	public List<String> getAllUsernames() {
		return this.userService.getListUsername();
	}
	
	
	
	/**
	 *  
	 * Permet de connaître le rôle du user
	 * @return: retourne la liste des customer (username + authority).
	 */
	@GetMapping("/authorities")
	public List<Authority> getAllAuthorities() {
		return this.authorityService.getAllAuthorities();
	}
	
	/**
	 * retourne l'infos du fullname et du statut abonné ou non de l'utilisateur. 
	 * @param username : identifiant de l'utilisateur
	 * @return retourne les nom et mail de l'utilisateur
	 */
	@GetMapping("/getuserinfos/{username}")
	public List<String> getUserInfos(@PathVariable String username) {
		return this.userService.getUserInfos(username);
	}
	
	/**
	 * Fonction indiquant si l'utilisateur est abonné 
	 * @param username : identifiant de l'utilisateur
	 * @param selectedDate : date déterminant si l'
	 * @return: retourne un boolean indiquant si l'utilisateur est abonné ou non à la date selectedDate
	 */
	@GetMapping("/getisusernamesubscribedselecteddate/{username}/{selectedDate}")
	public boolean findIsSubscribedSelectedDate(@PathVariable String username, @PathVariable String selectedDate) {
		return this.userService.findIsSubscribedSelectedDateByUsername(username, selectedDate);
	}

}
