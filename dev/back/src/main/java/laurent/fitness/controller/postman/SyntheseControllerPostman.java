package laurent.fitness.controller.postman;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Command;
import laurent.fitness.services.CommandService;

@RestController
@RequestMapping("/postman/synthesectrl")
public class SyntheseControllerPostman {
	private CommandService commandService;
	
	public SyntheseControllerPostman(CommandService commandService) {
		this.commandService = commandService;;
	}

	
	// Récupération des différentes de commandes et de leur état (payé ou non) pour un utilisteur donné
		@GetMapping("/getcommands")
		public List<Command> GetCommands(@Valid String username){
		
			try {
				return this.commandService.findCommandsByUsername(username);
			} catch(Exception e) {
				return null;
			}
		}
}
