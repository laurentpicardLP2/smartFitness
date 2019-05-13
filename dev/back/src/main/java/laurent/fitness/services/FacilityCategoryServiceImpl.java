package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.FacilityCategory;
import laurent.fitness.repository.FacilityCategoryRepository;

@Service
public class FacilityCategoryServiceImpl implements FacilityCategoryService {
	
	private FacilityCategoryRepository facilityCategoryRepo;
	

    public FacilityCategoryServiceImpl(FacilityCategoryRepository facilityCategoryRepo) {
        this.facilityCategoryRepo = facilityCategoryRepo; 
    }

	@Override
	public List<FacilityCategory> getAllFacilityCategories() {
		return  this.facilityCategoryRepo.findAll();
	}

	@Override
	public FacilityCategory saveFacilityCategory(FacilityCategory facilityCategory) {
		return this.facilityCategoryRepo.save(facilityCategory);
	}

	@Override
	public void deleteFacilityCategory(FacilityCategory facilityCategory) {
		this.facilityCategoryRepo.delete(facilityCategory);
	}

	@Override
	public FacilityCategory findByFacilityCategoryName(String facilityCategoryName) {
		return this.facilityCategoryRepo.findByFacilityCategoryName(facilityCategoryName);
	}

	@Override
	public FacilityCategory updateFacilityCategory(String nameFacilityCategory, String quantityFacilityCategory) {
		FacilityCategory facilityCategoryToUpdate = this.facilityCategoryRepo.findByFacilityCategoryName(nameFacilityCategory);
		facilityCategoryToUpdate.setQuantityFacilityCategory((Integer.parseInt(quantityFacilityCategory)));
		return this.facilityCategoryRepo.save(facilityCategoryToUpdate);
	}

	@Override
	public FacilityCategory findByIdFacilityCategory(int idFacilityCategory) {
		return this.facilityCategoryRepo.findByIdFacilityCategory(idFacilityCategory);
	}

	@Override
	public FacilityCategory updateFacilityCategory(int idFacilityCategory, String nameFacilityCategory) {
		FacilityCategory facilityCategory = this.facilityCategoryRepo.findByIdFacilityCategory(idFacilityCategory);
		facilityCategory.setNameFacilityCategory(nameFacilityCategory);
		return this.facilityCategoryRepo.save(facilityCategory);
	}

	@Override
	public FacilityCategory getFacilityCategoryAssociateToFacility(int idFacility) {
		return this.facilityCategoryRepo.findByIdFacilityCategoryAssociateToFacility(idFacility);
	}

	@Override
	public List<String> getListNameFacilityCategories() {
		return this.facilityCategoryRepo.findByNameFacilityCategoriesList();
	}




}
