package laurent.fitness.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import laurent.fitness.model.Facility;
import laurent.fitness.services.FacilityService;
import laurent.fitness.services.ReportingService;

@RestController
@RequestMapping("/reportingctrl")
@CrossOrigin("http://localhost:4200")
public class ReportingController {
	
	@Autowired
	private EntityManager entityManager;
	
	private ReportingService reportingService;
	private FacilityService facilityService;
	
	public ReportingController(ReportingService reportingService, FacilityService facilityService) {
		this.reportingService = reportingService;
		this.facilityService = facilityService;
	}

	//Retourne le dataset recensant le nb de timestamp global, ie le nb de fois que les équipements ont été utilisés
	@GetMapping("/getdatasetbooking/{period}")
	public ArrayList<Integer> getDataSetBooking(@PathVariable Integer period) {
		return this.reportingService.getDataSetBooking(period);
	}
	
	//Retourne le dataset du comparatif des recettes et des dépenses pour chq équipement
	@GetMapping("/getdatasetrentability")
	public Map<String, List<Float>> getDataSetRentability() {
		Map<String, List<Float>> data = new HashMap<String, List<Float>>();
		for(Facility facility : this.facilityService.getAllFacilities()) {
			data.put(facility.getNameFacility(), getBalanceSheet(facility.getIdFacility()));
		}
		return data;
	}
	
	public List<Float> getBalanceSheet(int idFacility) {
		List<Float> balanceSheet = new ArrayList<Float>();
		balanceSheet.add(this.facilityService.getRevenueForAFacility(idFacility));
		
		StoredProcedureQuery storedProcedure = entityManager.createStoredProcedureQuery("proc_expenditure");
	    storedProcedure.registerStoredProcedureParameter(1, Integer.class , ParameterMode.IN);
	    storedProcedure.registerStoredProcedureParameter(2, Float.class , ParameterMode.OUT);
	    storedProcedure.setParameter(1, idFacility);
	    storedProcedure.execute();
	    Object expenditure =  storedProcedure.getOutputParameterValue(2);
	    balanceSheet.add(Float.valueOf(expenditure.toString()));


		return balanceSheet;
	}
}
