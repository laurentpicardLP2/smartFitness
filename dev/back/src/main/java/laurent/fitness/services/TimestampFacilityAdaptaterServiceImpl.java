package laurent.fitness.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import laurent.fitness.model.TimestampFacility;
import laurent.fitness.model.adaptater.TimestampFacilityAdaptater;
import laurent.fitness.repository.FacilityCategoryRepository;
import laurent.fitness.repository.FacilityRepository;
import laurent.fitness.repository.SeanceRepository;
import laurent.fitness.repository.TimestampFacilityRepository;

@Service
public class TimestampFacilityAdaptaterServiceImpl implements TimestampFacilityAdaptaterService {
	
	private TimestampFacilityRepository timestampFacilityRepo;
	
	public TimestampFacilityAdaptaterServiceImpl(TimestampFacilityRepository timestampFacilityRepo) {
		this.timestampFacilityRepo = timestampFacilityRepo;
	}

	@Override
	public List<TimestampFacilityAdaptater> getTimestampFacilitiesForASeance(int idItem) {
		// TODO Auto-generated method stub
		Map daysName = new HashMap<Integer, String>();
		Map monthsName = new HashMap<Integer, String>();
		Date dateOfTimestampStart;
		Date dateOfTimestampEnd;
		String dayName;
		int dayOfMonth;
		String monthName;
		int year;
		int hourStart;
		int minuteStart;
		int hourEnd;
		int minuteEnd;
		String nameFacility;
		String nameFacilityCategory;
		
		daysName.put(0, "Dimanche");
		daysName.put(1, "Lundi");
		daysName.put(2, "Mardi");
		daysName.put(3, "Mercredi");
		daysName.put(4, "Jeudi");
		daysName.put(5, "Vendredi");
		daysName.put(6, "Samedi");
		
		monthsName.put(0, "Janvier");
		monthsName.put(1, "Février");
		monthsName.put(2, "Mars");
		monthsName.put(3, "Avril");
		monthsName.put(4, "Mai");
		monthsName.put(5, "Juin");
		monthsName.put(6, "Juillet");
		monthsName.put(7, "Août");
		monthsName.put(8, "Septembre");
		monthsName.put(9, "Octobre");
		monthsName.put(10, "Novembre");
		monthsName.put(11, "Décembre");
		
		
		List<TimestampFacilityAdaptater> timestampFacilityAdaptater = new ArrayList<TimestampFacilityAdaptater>();
		List<TimestampFacility> timestampFacilities = this.timestampFacilityRepo.findTimestampByIdSeance(idItem);
		for (TimestampFacility timestampFacility : timestampFacilities) {
			dateOfTimestampStart = timestampFacility.getDateOfTimestamp();
			//dateOfTimestampStart = new Date(dateOfTimestampStart.getTime() + 3600000);
			dateOfTimestampEnd = new Date(dateOfTimestampStart.getTime() + 600000);
			
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(dateOfTimestampStart);
			dayName = (String)daysName.get(calendar.get(Calendar.DAY_OF_WEEK));
			dayOfMonth = calendar.get(Calendar.DAY_OF_MONTH);
			monthName = (String)monthsName.get(calendar.get(Calendar.MONTH));
			year =  calendar.get(Calendar.YEAR);
			hourStart = calendar.get(Calendar.HOUR_OF_DAY);
			minuteStart = calendar.get(Calendar.MINUTE);
			calendar.setTime(dateOfTimestampEnd);
			hourEnd = calendar.get(Calendar.HOUR_OF_DAY);
			minuteEnd = calendar.get(Calendar.MINUTE);
			nameFacility = timestampFacility.getFacility().getNameFacility();
			nameFacilityCategory = timestampFacility.getFacilityCategory().getNameFacilityCategory();
			timestampFacilityAdaptater.add(new TimestampFacilityAdaptater(dateOfTimestampStart,dateOfTimestampEnd, dayName, dayOfMonth, monthName, year, hourStart, minuteStart, hourEnd, minuteEnd,nameFacility,nameFacilityCategory));
		}
		return timestampFacilityAdaptater;

	}

}
