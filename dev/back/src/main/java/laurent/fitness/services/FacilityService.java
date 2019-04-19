package laurent.fitness.services;

import java.util.Date;
import java.util.List;
import laurent.fitness.model.Facility;
import laurent.fitness.model.MaintenanceOperation;

public interface FacilityService {
	public List<Facility> getAllFacilities();
	
	public Facility saveNewFacility(String facilityName, String roomName, String facilityCategoryName);
	
	public Facility updateFacility(int idFacility, String nameFacilityCategory, String nameRoom, String nameFacility, float priceSeance, String descriptionFacility, String imageFacility, float priceFacility);
	 
	public Facility saveFacility(Facility facility);
	
	public Facility updateFacility(String facilityName, String roomName);
	
	public Facility addMaintenanceOperationToFacility(int idFacility, MaintenanceOperation operation);
	
	public void deleteMaintenanceOperationFromFacility(int idFacility, int idMaintenanceOperation);
	
	public void deleteFacility(Facility facility);
	
	public Facility findByFacilityName(String facilityName);
	
	public Facility addFacility(int idFacilityCategory, int idRoom, String nameFacility, String descriptionFacility, String imageFacility, float priceSeance, float priceFacility, Date dateOfPurchase);
	
	public float getRevenueForAFacility(int idFacility);
	
	public List<String> getListNameFacilities();

}
