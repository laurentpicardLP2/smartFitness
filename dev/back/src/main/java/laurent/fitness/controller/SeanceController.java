package laurent.fitness.controller;

import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Seance;
import laurent.fitness.services.ConvertTimeToStringService;
import laurent.fitness.services.ItemService;
import laurent.fitness.services.SeanceService;

@RestController
@RequestMapping("/seancectrl")
@CrossOrigin("http://localhost:4200")
public class SeanceController {

	private SeanceService seanceService;
	private ItemService itemService;
	private ConvertTimeToStringService convertTimeToStringService;
	
	public SeanceController(SeanceService seanceService, ItemService itemService, ConvertTimeToStringService convertTimeToStringService) {
		this.seanceService = seanceService;
		this.itemService = itemService;
		this.convertTimeToStringService = convertTimeToStringService;
	}
	
	//Initialise une seance pour une commande donnée d'un utilisateur connecté
	@PostMapping("/addseance/{idCommand}/{username}")
	public ResponseEntity<?> addSeance(@PathVariable int idCommand, @PathVariable String username) {

		try {
			Seance newSeance = this.seanceService.addSeance(idCommand, username, 0f);
		
		return ResponseEntity.status(HttpStatus.OK).body(newSeance);
		
		} catch(Exception e) {
			
			Logger logger = Logger.getLogger("Try-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	//Supprime une seance 
	@DeleteMapping("/deleteseance/{idItem}")
	public ResponseEntity<?> deleteSeance(@PathVariable int idItem) {
		try {
			this.itemService.deleteItem(idItem);
			return ResponseEntity.status(HttpStatus.OK).body(null);
		
		} catch(Exception e) {
			
			Logger logger = Logger.getLogger("Try-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	//Affecte à une seance la date correspondant au premier timestamp
	//Met à un le champ status_seance lors de la première étape de validation d'une séance 
	@PutMapping("/adddateandnbtimestamp/{idItem}")
	public ResponseEntity<?> addDateAndNbTimestamp(@PathVariable int idItem) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.seanceService.updateSeance(idItem));
		
		} catch(Exception e) {
			
			Logger logger = Logger.getLogger("Try-Catch Erreur");
			logger.log(Level.SEVERE, e.toString());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}

	//Indique si un customer a déjà réservé cette tranche horaire au cours d'une précédente réservation
	@GetMapping("/getisusernamebooked/{dateOfTimestamp}/{username}")
	public boolean getIsTimestampBooking(@PathVariable Date dateOfTimestamp, @PathVariable String username) {
		return this.seanceService.checkTimestampIsTaken(this.convertTimeToStringService.getStringOfTimestamp(dateOfTimestamp), username);
	}
	
	//Indique si un customer a déjà ouvert une autre instance de réservation de séance non clôturée
	@GetMapping("/getisopenseance/{username}")
	public boolean getIsAnotherSeanceOpen(@PathVariable String username) {
		return this.seanceService.checkAnotherSeanceIsOpen(username);
	}
		
}
