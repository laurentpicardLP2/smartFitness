package laurent.fitness.controller;

import java.util.List;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Evenement;
import laurent.fitness.services.EvenementService;

@RestController
@RequestMapping("/evenementctrl")
@CrossOrigin("http://localhost:4200")
public class EvenementController {
	private EvenementService evenementService;
	
	public EvenementController(EvenementService evenementService) {
		this.evenementService = evenementService;
	}
	
	//Retourne la valeur max de idEvt
	@GetMapping("/getidmaxevenement")
	public int getIdMaxEvenement() {
		try {
			return this.evenementService.getIdMaxEvenement();			

		} catch (Exception e) {
			return 0;
		}
	}
	
	//Retourne la liste de tous les événements
	@GetMapping("/getallevenements")
	public List<Evenement> getAllEvenements() {
	    return this.evenementService.findAllEvenement();	
	}
	
	//Retourne la liste de tous les événements accessibles pour les managers (tous les événements actuels ou futurs)
	@GetMapping("/getevenementinprogress")
	public List<Evenement> getEvenementInProgress() {
	    return this.evenementService.getEvenementInProgress();	
	}
	
	//Retourne la liste de tous les événements en cours
	@GetMapping("/getevenementinslottime")
	public List<Evenement> getEvenementInSlotTime() {
	    return this.evenementService.getEvenementInSlotTime();	
	}
	
	@PostMapping("/addevenement")
	public ResponseEntity<?> addEvenement(@RequestBody Evenement evenement){
        
		try {
			return ResponseEntity.status(HttpStatus.OK).body(
					this.evenementService.saveEvenement(evenement));
			} catch(Exception e) {
				
				System.out.println(e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new String("Pb creation evenement"));	
			}	
	}
	
	// Fonction modifiant un événement
	@PutMapping("/updateevenement")
	public Evenement updateEvenement(@RequestBody Evenement evenement) {
		return this.evenementService.updateEvenement(evenement);			
	}
	
	@DeleteMapping("/delevenement/{idEvt}")
	public ResponseEntity<?> delEvenement(@PathVariable Integer idEvt){
        
		try {
			this.evenementService.deleteEvenement(idEvt);
			return ResponseEntity.status(HttpStatus.OK).body(null);
			} catch(Exception e) {
				
				Logger logger = Logger.getLogger("Try-Catch Erreur");
				logger.log(Level.SEVERE, e.toString());
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
			}	
	}
	
	// Fonction retournant l'événement associé à idEvt
	@GetMapping("/getevenementbyid/{idEvt}")
	public Evenement getEvenementById(@PathVariable Integer idEvt) {
		return this.evenementService.findEvenementById(idEvt);			
	}
}