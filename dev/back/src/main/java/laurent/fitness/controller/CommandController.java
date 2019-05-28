package laurent.fitness.controller;

import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;

import org.springframework.beans.factory.annotation.Autowired;
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
import laurent.fitness.model.adaptater.ItemPaypalAdaptater;
import laurent.fitness.services.CommandService;
import laurent.fitness.services.CustomerService;
import laurent.fitness.services.ItemPaypalAdaptaterService;
import laurent.fitness.services.SeanceService;

@RestController
@RequestMapping("/commandctrl")
@CrossOrigin("http://localhost:4200")
public class CommandController {
	@Autowired
	private EntityManager entityManager;
	
	private CommandService commandService;
	private CustomerService customerService;
	private SeanceService seanceService;
	private ItemPaypalAdaptaterService itemPaypalAdaptaterService;
	
	public CommandController(CommandService commandService, CustomerService customerService, SeanceService seanceService, ItemPaypalAdaptaterService itemPaypalAdaptaterService) {
		this.commandService = commandService;
		this.customerService = customerService;
		this.seanceService = seanceService;
		this.itemPaypalAdaptaterService = itemPaypalAdaptaterService;
	}
	
	//Initialise une commande lorsqu'un utilisateur se connecte
	@PostMapping("/addcommand/{username}")
	public ResponseEntity<Command> addCommand(@PathVariable String username) {
		Logger logger = Logger.getLogger("addcommand Try-Catch Erreur");

		try {
			Customer customer = this.customerService.findByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(this.commandService.saveCommand(new Command(customer, new Date())));
		
		} catch(Exception e) {
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
		
	// Delete a command
	@DeleteMapping("/delcommand/{idCommand}")
	public ResponseEntity<?> delCommand(@PathVariable int idCommand){
		try {
			if(this.commandService.findByIdCommand(idCommand) != null) {
				this.commandService.deleteCommand(this.commandService.findByIdCommand(idCommand));
			}
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			Logger logger = Logger.getLogger(" delcommandTry-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	// Supprime les commandes à 0 lorsqu'un customer ouvre une session
	// Supprime les commandes à 0 lorsque le customer quitte une session sans faire de logout (fermeture de la fenêtre)
	@DeleteMapping("/cleancommand/{username}")
	public ResponseEntity<?> cleanCommand(@PathVariable String username){
		try {
			this.commandService.deleteCommandsZeroByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			Logger logger = Logger.getLogger(" cleancommandTry-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	// Vérifie que le numéro de commande est toujours valide (cas où l'utilisateur ouvrirait deux instances simultanées de réservation)
	@GetMapping("/getiscommandok/{idCommand}")
	public boolean isCommandeOk(@PathVariable Integer idCommand) {
		return this.commandService.isCommandAlwaysExists(idCommand);
	}
	
	// Vérifie qu'il n y a pas de session déjà ouverte
	@GetMapping("/detectsessionopen/{username}")
	public boolean isAnotherSessionOpen(@PathVariable String username) {
		return this.commandService.isDetectCommandZeroByUsername(username);
	}
	
	// Reset a command resetcommand
	@PutMapping("/resetcommand/{idCommand}/{username}")
	public ResponseEntity<Command> resetCommand(@PathVariable int idCommand, @PathVariable String username){
	
		try {
			this.commandService.deleteCommand(this.commandService.findByIdCommand(idCommand));
			Customer customer = this.customerService.findByUsername(username);
			return ResponseEntity.status(HttpStatus.OK).body(this.commandService.saveCommand(new Command(customer, new Date())));
		} catch(Exception e) {
			Logger logger = Logger.getLogger(" commandService Try-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	// Validation du panier : maj en base des prix des différents items du panier
	@PutMapping("/validatecommand")
	public ResponseEntity<Command> validateCommand(@RequestBody Command command){
	
		try {
						
			for(Item item : command.getItems()) {
				
				if (item.getTypeItem().split(":")[1].equals("seance")) {
					Seance seance = this.seanceService.findSeanceById(item.getIdItem());
					seance.setPrice(item.getPrice());
				}			
			}
			this.commandService.saveCommand(command);
			return ResponseEntity.status(HttpStatus.OK).body(command); 
					
		} catch(Exception e) {
			Logger logger = Logger.getLogger("Try-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	// Met à jour la commande suite à la suppresion d'articles dans le panier
		@PutMapping("/updatecommand")
	public ResponseEntity<Command> updateCommand(@RequestBody Command command){
	
		try {
			this.commandService.saveCommand(command);
			return ResponseEntity.status(HttpStatus.OK).body(command); 
					
		} catch(Exception e) {
			Logger logger = Logger.getLogger("validatecommand Try-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	//Retourne la liste des items pour une commande d'un client
	@GetMapping("/getitemsbycommand/{idCommand}")
	public List<ItemPaypalAdaptater> getItemsPaypalAdaptaterForACommand(@PathVariable Integer idCommand) {
		StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("proc_item_paypal");
		storedProcedure.registerStoredProcedureParameter(1, Integer.class , ParameterMode.IN);
	    storedProcedure.setParameter(1, idCommand);
	    storedProcedure.execute();
	    return itemPaypalAdaptaterService.findAllItemsPaypalAdaptater();	
	}
	
	
	
	// Met à 1 le statut de la commande idCommand (correspond au statut 'en cours d'acquisition')
	@PutMapping("/setupdatestatusandpricetocommand/{idCommand}/{totalPrice}")
	public ResponseEntity<Command> setUpdateStatusAndPriceToCommand(@PathVariable int idCommand, @PathVariable float totalPrice){
	
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.commandService.setUpdateStatusAndPriceToCommand(idCommand, totalPrice));
		} catch(Exception e) {
			Logger logger = Logger.getLogger("setupdatestatusandpricetocommand Try-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	
	
}
