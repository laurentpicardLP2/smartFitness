package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.adaptater.FacilityAdaptater;
import laurent.fitness.repository.FacilityAdaptaterRepository;

@Service
public class FacilityAdaptaterServiceImpl implements FacilityAdaptaterService {
	private FacilityAdaptaterRepository facilityAdaptaterRepo;
	
	public FacilityAdaptaterServiceImpl(FacilityAdaptaterRepository facilityAdaptaterRepo) {
		this.facilityAdaptaterRepo = facilityAdaptaterRepo;
	}

	@Override
	public List<FacilityAdaptater> findAllFacilitiesAdapter() {
		// TODO Auto-generated method stub
		return this.facilityAdaptaterRepo.findAll();
	}

}
