package laurent.fitness.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Command;
import laurent.fitness.model.Seance;
import laurent.fitness.model.TimestampFacility;
import laurent.fitness.model.adaptater.TimestampFacilityAdaptater;
import laurent.fitness.repository.TimestampFacilityRepository;
import laurent.fitness.services.CommandService;
import laurent.fitness.services.CustomerService;
import laurent.fitness.services.SeanceService;
import laurent.fitness.services.TimestampFacilityAdaptaterService;
import laurent.fitness.services.TimestampFacilityService;

@RestController
@RequestMapping("/synthesectrl")
@CrossOrigin("http://localhost:4200")
public class SyntheseController {

	private CommandService commandService;
	private TimestampFacilityAdaptaterService timestampFacilityAdaptaterService;
	private SeanceService seanceService;
	
	public SyntheseController(CommandService commandService, SeanceService seanceService, TimestampFacilityAdaptaterService timestampFacilityAdaptaterService) {
		this.commandService = commandService;
		this.timestampFacilityAdaptaterService = timestampFacilityAdaptaterService;
		this.seanceService = seanceService;
	}

	
	// Récupération des différentes de commandes et de leur état (payé ou non) pour un utilisteur donné
	@GetMapping("/getcommands/{username}")
	public List<Command> GetCommands(@PathVariable String username){
	System.out.println("username : " + username);
		try {
			return this.commandService.findCommandByUsername(username);
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
	@GetMapping("/gettimestampfromaseance/{idItem}")
	public List<TimestampFacilityAdaptater> GetTimestampFromASeance(@PathVariable int idItem){
		try {
			return this.timestampFacilityAdaptaterService.getTimestampFacilitiesForASeance(idItem);
		} catch(Exception e) {
			System.out.println(e);
			return null;
		}
	}	

}
