package laurent.fitness.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Command;
import laurent.fitness.model.Seance;
import laurent.fitness.services.CommandService;
import laurent.fitness.services.ItemService;
import laurent.fitness.services.SeanceService;

@RestController
@RequestMapping("/seancectrl")
@CrossOrigin("http://localhost:4200")
public class SeanceController {

	private SeanceService seanceService;
	private ItemService itemService;
	
	public SeanceController(SeanceService seanceService, ItemService itemService) {
		this.seanceService = seanceService;
		this.itemService = itemService;
	}
	
	//Initialise une seance pour une commande donnée d'un utilisateur connecté
	@PostMapping("/addseance/{idCommand}/{username}")
	public ResponseEntity<?> addSeance(@PathVariable int idCommand, @PathVariable String username) {

		try {
			Seance newSeance = this.seanceService.createSeance(idCommand, username, 0f);
		
		return ResponseEntity.status(HttpStatus.OK).body(newSeance);
		
		} catch(Exception e) {
			
			System.out.println(e);
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
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	//Affecte à une seance la date correspondant au premier timestamp
	@PutMapping("/adddateandnbtimestamp/{idItem}")
	public ResponseEntity<?> addDateAndNbTimestamp(@PathVariable int idItem) {

		try {
			return ResponseEntity.status(HttpStatus.OK).body(this.seanceService.updateSeance(idItem));
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}

	
		
}
