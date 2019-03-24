package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.FacilityCategory;

public interface FacilityCategoryService {
	public List<FacilityCategory> getAllFacilityCategories();
	
	public FacilityCategory saveFacilityCategory(FacilityCategory facilityCategory);
	
	public void deleteFacilityCategory(FacilityCategory facilityCategory);
	
	public FacilityCategory findByFacilityCategoryName(String facilityCategoryName);
	
	public FacilityCategory findByIdFacilityCategory(int idFacilityCategory);
	
	public FacilityCategory updateFacilityCategory(String nameFacilityCategory, String quantityFacilityCategory,
			String priceFacilityCategory);

}
