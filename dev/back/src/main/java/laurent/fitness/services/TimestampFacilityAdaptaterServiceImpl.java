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
import laurent.fitness.repository.TimestampFacilityRepository;

@Service
public class TimestampFacilityAdaptaterServiceImpl implements TimestampFacilityAdaptaterService {
	
	private TimestampFacilityRepository timestampFacilityRepo;
	
	public TimestampFacilityAdaptaterServiceImpl(TimestampFacilityRepository timestampFacilityRepo) {
		this.timestampFacilityRepo = timestampFacilityRepo;
	}

	@Override
	public List<TimestampFacilityAdaptater> getTimestampFacilitiesForASeance(int idItem) {
		Map<Integer, String> daysName = new HashMap<Integer, String>();
		Map<Integer, String> monthsName = new HashMap<Integer, String>();
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
		
		daysName.put(1, "Dimanche");
		daysName.put(2, "Lundi");
		daysName.put(3, "Mardi");
		daysName.put(4, "Mercredi");
		daysName.put(5, "Jeudi");
		daysName.put(6, "Vendredi");
		daysName.put(7, "Samedi");
		
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
