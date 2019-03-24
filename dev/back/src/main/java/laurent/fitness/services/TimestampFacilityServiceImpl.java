package laurent.fitness.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Seance;
import laurent.fitness.model.TimestampFacility;
import laurent.fitness.model.adaptater.TimestampFacilityAdaptater;
import laurent.fitness.repository.FacilityCategoryRepository;
import laurent.fitness.repository.FacilityRepository;
import laurent.fitness.repository.SeanceRepository;
import laurent.fitness.repository.TimestampFacilityRepository;

@Service
public class TimestampFacilityServiceImpl implements TimestampFacilityService {
	
	private TimestampFacilityRepository timestampFacilityRepo;
	private SeanceRepository seanceRepo;
	private FacilityRepository facilityRepo;
	private FacilityCategoryRepository facilityCategoryRepo;
	
	public TimestampFacilityServiceImpl(
			TimestampFacilityRepository timestampFacilityRepo, 
			SeanceRepository seanceRepo,
			FacilityRepository facilityRepo, 
			FacilityCategoryRepository facilityCategoryRepo) {
		this.timestampFacilityRepo = timestampFacilityRepo;
		this.seanceRepo = seanceRepo;
		this.facilityRepo = facilityRepo;
		this.facilityCategoryRepo = facilityCategoryRepo;
	}

	@Override
	public List<TimestampFacility> getAllTimestampFacilities() {
		// TODO Auto-generated method stub
		return this.timestampFacilityRepo.findAll();
	}

	@Override
	public TimestampFacility saveNewTimestampFacility(int idItem, Date dateOfTimestamp, String facilityName, String facilityCategoryName) {
		// TODO Auto-generated method stub
		//dateOfTimestamp = new Date(dateOfTimestamp.getTime() + 3600000);
		Seance seance = this.seanceRepo.findByIdItem(idItem);
		Facility facility = this.facilityRepo.findByFacilityName(facilityName);
		FacilityCategory facilityCategory = this.facilityCategoryRepo.findByFacilityCategoryName(facilityCategoryName);
		TimestampFacility timestampFacility = new TimestampFacility(seance, facility, facilityCategory, dateOfTimestamp);
		return this.timestampFacilityRepo.save(timestampFacility);
	}

	@Override
	public void deleteTimestampFacility(int idTimestampFacillity) {
		// TODO Auto-generated method stub
		TimestampFacility timestampFacility = this.timestampFacilityRepo.findById(idTimestampFacillity).get();
		this.timestampFacilityRepo.delete(timestampFacility);
	}

	@Override
	public TimestampFacility saveTimestampFacility(TimestampFacility timestampFacility) {
		// TODO Auto-generated method stub
		return this.timestampFacilityRepo.save(timestampFacility);
	}

	@Override
	public int findByFacilityCategoryCount(String facilityCategoryName, String timestampToString) {
		// TODO Auto-generated method stub
		return this.timestampFacilityRepo.findByFacilityCategoryCount(facilityCategoryName, timestampToString);
	}
	
	
//	public Date getDateOfRefTimestamp(String refTimestamp){
//		Calendar calendar = Calendar.getInstance();
//		
//	    String[] splitRefTimestamp = refTimestamp.split("_");
//	    int year = Integer.parseInt(splitRefTimestamp[0]);
//	    int month = Integer.parseInt(splitRefTimestamp[1])-1;
//	    int day = Integer.parseInt(splitRefTimestamp[2]);
//	    int hour = Integer.parseInt(splitRefTimestamp[3]);
//	    int minute = Integer.parseInt(splitRefTimestamp[4]);
//	    calendar.set(year, month, day, hour, minute, 0);
//	    return calendar.getTime();
//	  }
}
