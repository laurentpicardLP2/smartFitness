package laurent.fitness.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Command;
import laurent.fitness.model.Seance;
import laurent.fitness.model.adaptater.TimestampFacilityAdaptater;
import laurent.fitness.services.CommandService;
import laurent.fitness.services.ItemService;
import laurent.fitness.services.SeanceService;
import laurent.fitness.services.TimestampFacilityAdaptaterService;

@RestController
@RequestMapping("/synthesectrl")
@CrossOrigin("http://localhost:4200")
public class SyntheseController {

	private CommandService commandService;
	private TimestampFacilityAdaptaterService timestampFacilityAdaptaterService;
	private SeanceService seanceService;
	private ItemService itemService;
	
	
	public SyntheseController(CommandService commandService, SeanceService seanceService, TimestampFacilityAdaptaterService timestampFacilityAdaptaterService,  
			ItemService itemService) {
		this.commandService = commandService;
		this.timestampFacilityAdaptaterService = timestampFacilityAdaptaterService;
		this.seanceService = seanceService;
		this.itemService = itemService;
	}

	
	// Récupération des différentes de commandes et de leur état (payé ou non) pour un utilisteur donné
	@GetMapping("/getcommands/{username}")
	public List<Command> GetCommands(@PathVariable String username){
	System.out.println("username : " + username);
		try {
			return this.commandService.findCommandsByUsername(username);
		} catch(Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	// Récupération des séances pour un utilisteur donné
	@GetMapping("/getseances/{username}")
	public List<Seance> GetSeances(@PathVariable String username){
		try {
			return this.seanceService.findSeancesByUsername(username);
		} catch(Exception e) {
			System.out.println(e);
			return null;
		}
	}	
	
	// Récupération des timestamp d'une séance (composition d'une séance)
	@GetMapping("/gettimestampforaseance/{idItem}")
	public List<TimestampFacilityAdaptater> GetTimestampFromASeance(@PathVariable int idItem){
		try {
			return this.timestampFacilityAdaptaterService.getTimestampFacilitiesForASeance(idItem);
		} catch(Exception e) {
			System.out.println(e);
			return null;
		}
	}
	
	// Suppression de l'article {idItem} du panier du client
	@DeleteMapping("/delitemfromcart/{idItem}")
	public  ResponseEntity<?> deleteIemFromCart(@PathVariable Integer idItem){
		try {
			this.itemService.deleteItem(idItem);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} catch(Exception e) {
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}
	}
	
	

}
