package laurent.fitness.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.services.ReportingService;

@RestController
@RequestMapping("/reportingctrl")
@CrossOrigin("http://localhost:4200")
public class ReportingController {
	
	private ReportingService reportingService;
	
	public ReportingController(ReportingService reportingService) {
		this.reportingService = reportingService;
	}

	//Retourne le dataset recensant le nb de timestamp global, ie le nb de fois que les équipements ont été utilisés
	@GetMapping("/getdataset/{period}")
	public ArrayList<Integer> getDataSet(@PathVariable Integer period) {
		return this.reportingService.getDataSet(period);
	}
}
