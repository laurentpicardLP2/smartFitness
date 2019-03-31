package laurent.fitness.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.services.ItemService;
import laurent.fitness.services.SeanceService;

@RestController
@RequestMapping("/offrectrl")
@CrossOrigin("http://localhost:4200")
public class OffreController {
	private SubscriptionService seanceService;
	private ItemService itemService;
	
	public OffreController(SeanceService seanceService, ItemService itemService) {
		this.seanceService = seanceService;
		this.itemService = itemService;
	}
}
