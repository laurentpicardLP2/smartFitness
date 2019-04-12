package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.FacilityCategory;
import laurent.fitness.repository.FacilityCategoryRepository;
import laurent.fitness.repository.TimestampFacilityRepository;

@Service
public class FacilityCategoryServiceImpl implements FacilityCategoryService {
	
	private FacilityCategoryRepository facilityCategoryRepo;
	

    public FacilityCategoryServiceImpl(FacilityCategoryRepository facilityCategoryRepo) {
        this.facilityCategoryRepo = facilityCategoryRepo; 
    }

	@Override
	public List<FacilityCategory> getAllFacilityCategories() {
		// TODO Auto-generated method stub
		return  this.facilityCategoryRepo.findAll();
	}

	@Override
	public FacilityCategory saveFacilityCategory(FacilityCategory facilityCategory) {
		// TODO Auto-generated method stub
		return this.facilityCategoryRepo.save(facilityCategory);
	}

	@Override
	public void deleteFacilityCategory(FacilityCategory facilityCategory) {
		// TODO Auto-generated method stub
		this.facilityCategoryRepo.delete(facilityCategory);
	}

	@Override
	public FacilityCategory findByFacilityCategoryName(String facilityCategoryName) {
		// TODO Auto-generated method stub
		return this.facilityCategoryRepo.findByFacilityCategoryName(facilityCategoryName);
	}

	@Override
	public FacilityCategory updateFacilityCategory(String nameFacilityCategory, String quantityFacilityCategory) {
		// TODO Auto-generated method stub
		FacilityCategory facilityCategoryToUpdate = this.facilityCategoryRepo.findByFacilityCategoryName(nameFacilityCategory);
		facilityCategoryToUpdate.setQuantityFacilityCategory((Integer.parseInt(quantityFacilityCategory)));
		return this.facilityCategoryRepo.save(facilityCategoryToUpdate);
	}

	@Override
	public FacilityCategory findByIdFacilityCategory(int idFacilityCategory) {
		// TODO Auto-generated method stub
		return this.facilityCategoryRepo.findByIdFacilityCategory(idFacilityCategory);
	}

	@Override
	public FacilityCategory updateFacilityCategory(int idFacilityCategory, String nameFacilityCategory) {
		// TODO Auto-generated method stub
		FacilityCategory facilityCategory = this.facilityCategoryRepo.findByIdFacilityCategory(idFacilityCategory);
		facilityCategory.setNameFacilityCategory(nameFacilityCategory);
		return this.facilityCategoryRepo.save(facilityCategory);
	}

	@Override
	public FacilityCategory getFacilityCategoryAssociateToFacility(int idFacility) {
		// TODO Auto-generated method stub
		return this.facilityCategoryRepo.findByIdFacilityCategoryAssociateToFacility(idFacility);
	}




}
