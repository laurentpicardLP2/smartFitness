package laurent.fitness.controller.postman;

import java.util.ArrayList;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Command;
import laurent.fitness.model.Seance;
import laurent.fitness.services.CommandService;
import laurent.fitness.services.SeanceService;

@RestController
@RequestMapping("/postman/seancectrl")
public class SeanceControllerPostman {
	private SeanceService seanceService;
	private CommandService commandService;
	
	public SeanceControllerPostman(SeanceService seanceService, CommandService commandService) {
		this.seanceService = seanceService;
		this.commandService = commandService;
	}
	
	//Initialise une seance pour une commande donnée d'un utilisateur connecté (customer ou staff-seller)
	@PostMapping("/addseance")
	public ResponseEntity<?> addSeance(@Valid int idCommand, @Valid String username) {
		try {
			Seance newSeance = this.seanceService.createSeance(idCommand, username, 0f);
		
			return ResponseEntity.status(HttpStatus.OK).body(newSeance);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
		
	
}
