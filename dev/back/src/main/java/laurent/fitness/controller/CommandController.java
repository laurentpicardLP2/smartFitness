package laurent.fitness.controller;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.model.Item;
import laurent.fitness.model.Seance;
import laurent.fitness.model.User;
import laurent.fitness.services.CommandService;
import laurent.fitness.services.CustomerService;
import laurent.fitness.services.ItemService;
import laurent.fitness.services.SeanceService;
import laurent.fitness.services.UserService;

@RestController
@RequestMapping("/commandctrl")
@CrossOrigin("http://localhost:4200")
public class CommandController {
	private CommandService commandService;
	private CustomerService customerService;
	private SeanceService seanceService;
	
	public CommandController(CommandService commandService, CustomerService customerService, SeanceService seanceService) {
		this.commandService = commandService;
		this.customerService = customerService;
		this.seanceService = seanceService;
	}
	
	//Initialise une commande lorsqu'un utilisateur se connecte
	@PostMapping("/addcommand/{username}")
	public ResponseEntity<?> addCommand(@PathVariable String username) {
		try {
			Customer customer = this.customerService.findByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(this.commandService.saveCommand(new Command(customer, new Date())));
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	// Delete a command
	@DeleteMapping("/delcommand/{idCommand}")
	public ResponseEntity<?> delCommand(@PathVariable int idCommand){
		try {
			this.commandService.deleteCommand(this.commandService.findByIdCommand(idCommand));
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	// Reset a command resetcommand
	@PutMapping("/resetcommand/{idCommand}/{username}")
	public ResponseEntity<?> resetCommand(@PathVariable int idCommand, @PathVariable String username){
	
		try {
			this.commandService.deleteCommand(this.commandService.findByIdCommand(idCommand));
			Customer customer = this.customerService.findByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(this.commandService.saveCommand(new Command(customer, new Date())));
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	// Validation du panier : maj en base des prix des différents items du panier
	@PutMapping("/validatecommand")
	public ResponseEntity<?> validateCommand(@RequestBody Command command){
	
		try {
						
			for(Item item : command.getItems()) {
				Seance tmpSeance = this.seanceService.findSeanceById(item.getIdItem());
				tmpSeance.setPrice(item.getPrice());
				//this.seanceService.saveSeance(command.getIdCommand(), command.getCustomer().get, item.getPrice());				
			}
			
			this.commandService.saveCommand(command);
			
			return ResponseEntity.status(HttpStatus.OK).body(command);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
}
