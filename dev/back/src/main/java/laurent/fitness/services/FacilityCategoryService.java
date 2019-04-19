package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Room;

public interface FacilityCategoryService {
	public List<FacilityCategory> getAllFacilityCategories();
	
	public FacilityCategory saveFacilityCategory(FacilityCategory facilityCategory);
	
	public FacilityCategory updateFacilityCategory(int idFacilityCategory, String nameFacilityCategory);
	
	public void deleteFacilityCategory(FacilityCategory facilityCategory);
	
	public FacilityCategory findByFacilityCategoryName(String facilityCategoryName);
	
	public FacilityCategory findByIdFacilityCategory(int idFacilityCategory);
	
	public FacilityCategory updateFacilityCategory(String nameFacilityCategory, String quantityFacilityCategory);

	public FacilityCategory getFacilityCategoryAssociateToFacility(int idFacility);
	
	public List<String> getListNameFacilityCategories();

}
