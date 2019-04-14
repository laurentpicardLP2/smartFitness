package laurent.fitness.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Service;

import laurent.fitness.repository.TimestampFacilityRepository;

@Service
public class ReportingServiceImpl implements ReportingService {
	
	private TimestampFacilityRepository timestampFacilityRepo;
	
	public ReportingServiceImpl(TimestampFacilityRepository timestampFacilityRepo) {
		this.timestampFacilityRepo = timestampFacilityRepo;
	}

	@Override
	public ArrayList<Integer> getDataSetBooking(int period) {
		// TODO Auto-generated method stub
		ArrayList<Integer> data = new ArrayList<Integer>();
		Calendar calendar = Calendar.getInstance();
		
		calendar.setTime(new Date());
		int previousMonth;
		int nbTimestamp;
		previousMonth = (calendar.get(Calendar.MONTH) > 0) ? (calendar.get(Calendar.MONTH)) - 1 : 11;
		
		for(int m = previousMonth; m < 12; m++){
			nbTimestamp = this.timestampFacilityRepo.findTimestampByMonth(previousMonth + 1, (calendar.get(Calendar.YEAR)) - period);
		    data.add(new Integer(nbTimestamp));
		}
    
		for(int m = 0; m < previousMonth; m++){
			nbTimestamp = this.timestampFacilityRepo.findTimestampByMonth(previousMonth + 1, (calendar.get(Calendar.YEAR)) - (period + 1));
		    data.add(new Integer(nbTimestamp));
		}
		
		return data;
	}

}
