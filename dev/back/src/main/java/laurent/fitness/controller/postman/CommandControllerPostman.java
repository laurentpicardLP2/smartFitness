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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.model.User;
import laurent.fitness.services.CommandService;
import laurent.fitness.services.CustomerService;
import laurent.fitness.services.UserService;

@RestController
@RequestMapping("/postman/commandctrl")
public class CommandControllerPostman {
	private CommandService commandService;
	private CustomerService customerService;
	
	public CommandControllerPostman(CommandService commandService, CustomerService customerService) {
		this.commandService = commandService;
		this.customerService = customerService;
	}
	
	//Initialise une commande lorsqu'un utilisateur se connecte
	@PostMapping("/addcommand")
	public ResponseEntity<?> addCommand(@Valid String username) {
		try {
			Customer customer = this.customerService.findByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(this.commandService.saveCommand(new Command(customer, new Date())));
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// Delete a command by Postman
	@DeleteMapping("/delcommand")
	public ResponseEntity<?> delCommand(@Valid int idCommand){
		try {
			this.commandService.deleteCommand(this.commandService.findByIdCommand(idCommand));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	

}
