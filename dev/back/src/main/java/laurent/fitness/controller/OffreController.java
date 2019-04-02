package laurent.fitness.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Seance;
import laurent.fitness.model.Subscription;
import laurent.fitness.model.SubscriptionCategory;
import laurent.fitness.model.adaptater.FacilityAvailableAdaptater;
import laurent.fitness.services.ItemService;
import laurent.fitness.services.SeanceService;
import laurent.fitness.services.SubscriptionService;

@RestController
@RequestMapping("/offrectrl")
@CrossOrigin("http://localhost:4200")
public class OffreController {
	private SubscriptionService subscriptionService;
	private ItemService itemService;
	
	public OffreController(SubscriptionService subscriptionService, ItemService itemService) {
		this.subscriptionService = subscriptionService;
		this.itemService = itemService;
	}
	
	//Ajoute une subscription à une entité command pour un username donné
	@PostMapping("/addsubscription/{idCommand}/{username}/{idSubscriptionCategory}/{dateStartOfSubscription}/{dateEndOfSubscription}")
	public ResponseEntity<?> addSubscription(@PathVariable int idCommand, @PathVariable String username,
			@PathVariable Integer idSubscriptionCategory, @PathVariable Date dateStartOfSubscription, 
			@PathVariable Date dateEndOfSubscription) {

		try {
			Subscription newSubscription = this.subscriptionService.createSubscription(idCommand, username, idSubscriptionCategory, dateStartOfSubscription, dateEndOfSubscription);
		
		return ResponseEntity.status(HttpStatus.OK).body(newSubscription);
		
		} catch(Exception e) {
			
			System.out.println(e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);	
		}			
	}
	
	//Indique si un utilisateur est actuellement abonné
	@GetMapping("/getisusernamesubscribed/{username}")
	public boolean getSubscriptionCategories(@PathVariable String username) {
		return this.subscriptionService.findIsSubscribedByUsername(username);		
	}
	
	// Retourne l'historique des abonnements pour un utilisateur
	@GetMapping("/gethistoricsubscriptionsforanuser/{username}")
	public List<Subscription> getHistoricSubscriptionsForAnUser(@PathVariable String username) {
		return this.subscriptionService.findHistoricSubscriptionsByUsername(username);
	}
	
	// Retourne l'abonnement en cours s'il y en a un pour l'utilisateur username
	@GetMapping("/getactivesubscriptionforanuser/{username}")
	public Subscription getActiveSubscriptionsForAnUser(@PathVariable String username) {
		return this.subscriptionService.findActiveSubscriptionByUsername(username);
	}
	
	// Retourne les abonnements à venir pour un utilisateur
	@GetMapping("/getnextsubscriptionsforanuser/{username}")
	public List<Subscription> getNextSubscriptionsForAnUser(@PathVariable String username) {
		return this.subscriptionService.findNextSubscriptionsByUsername(username);
	}
}
