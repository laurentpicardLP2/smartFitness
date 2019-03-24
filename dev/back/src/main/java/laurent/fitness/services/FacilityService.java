package laurent.fitness.services;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import laurent.fitness.model.Facility;

public interface FacilityService {
	public List<Facility> getAllFacilities();
	
	public Facility saveNewFacility(String facilityName, String roomName, String facilityCategoryName);
	
	public Facility saveFacility(Facility facility);
	
	public Facility updateFacility(String facilityName, String roomName);
	
	public void deleteFacility(Facility facility);
	
	public Facility findByFacilityName(String facilityName);
	
	public Facility addFacility(int idFacilityCategory, int idRoom, String nameFacility, String descriptionFacility, String imageFacility);
	
}
