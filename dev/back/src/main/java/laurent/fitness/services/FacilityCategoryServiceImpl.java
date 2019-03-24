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
	public FacilityCategory updateFacilityCategory(String nameFacilityCategory, String quantityFacilityCategory,
			String priceFacilityCategory) {
		// TODO Auto-generated method stub
		FacilityCategory facilityCategoryToUpdate = this.facilityCategoryRepo.findByFacilityCategoryName(nameFacilityCategory);
		facilityCategoryToUpdate.setQuantityFacilityCategory((Integer.parseInt(quantityFacilityCategory)));
		facilityCategoryToUpdate.setPriceFacilityCategory((Float.parseFloat(priceFacilityCategory)));
		return this.facilityCategoryRepo.save(facilityCategoryToUpdate);
	}

	@Override
	public FacilityCategory findByIdFacilityCategory(int idFacilityCategory) {
		// TODO Auto-generated method stub
		return this.facilityCategoryRepo.findByIdFacilityCategory(idFacilityCategory);
	}




}
