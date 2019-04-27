package laurent.fitness.controller.postman;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.services.EvenementService;

@RestController
@RequestMapping("/postman/evenementctrl")
public class EvenementControllerPostman {
	private EvenementService evenementService;
	
	public EvenementControllerPostman(EvenementService evenementService) {
		this.evenementService = evenementService;
	}
	
	//Retourne la valeur max de idEvt
	@GetMapping("/getidmaxevenement")
	public int getIdMaxEvenementPostman() {
		try {
			return this.evenementService.getIdMaxEvenement();			

		} catch (Exception e) {
			return 0;
		}
	}
}


	
	