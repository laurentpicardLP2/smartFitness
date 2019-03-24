package laurent.fitness.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.adaptater.FacilityAvailableAdaptater;
import laurent.fitness.repository.FacilityCategoryRepository;
import laurent.fitness.repository.FacilityRepository;
import laurent.fitness.repository.TimestampFacilityRepository;

@Service
public class FacilityAvailableAdaptaterServiceImpl implements FacilityAvailableAdaptaterService {
	private FacilityRepository facilityRepo;
	private FacilityCategoryRepository facilityCategoryRepo;
	private TimestampFacilityRepository timestampFacilityRepo;
	
	public FacilityAvailableAdaptaterServiceImpl(
			FacilityCategoryRepository facilityCategoryRepo,
			TimestampFacilityRepository timestampFacilityRepo,
			FacilityRepository facilityRepo) {
        this.facilityCategoryRepo = facilityCategoryRepo;
        this.timestampFacilityRepo = timestampFacilityRepo;
        this.facilityRepo = facilityRepo;
    }

	
	@Override
	public List<FacilityAvailableAdaptater> getFacilitiesAvailable(String timestampToString) {
		// TODO Auto-generated method stub
		
		int availableFacilities = 0;
		String nameFacilityCategory = "";
		float priceFacilityCategory = 0f;
		ArrayList<FacilityAvailableAdaptater> facilitiesAvailableAdaptater = new ArrayList<FacilityAvailableAdaptater>() ;
		List<Facility> facilities = null;
		List<FacilityCategory> facilityCategories = this.facilityCategoryRepo.findAll();
		
		
		for (int i=0; i<facilityCategories.size(); i++) {
			nameFacilityCategory = facilityCategories.get(i).getNameFacilityCategory();
			priceFacilityCategory = facilityCategories.get(i).getPriceFacilityCategory();
			availableFacilities = this.timestampFacilityRepo.findByFacilityCategoryCount(nameFacilityCategory, timestampToString);
			facilities = this.facilityRepo.findByFacilityAvailable(nameFacilityCategory, timestampToString);
			facilitiesAvailableAdaptater.add(new FacilityAvailableAdaptater(nameFacilityCategory, priceFacilityCategory, availableFacilities, facilities));
		}
		return facilitiesAvailableAdaptater;
	}
	
	
	

}
