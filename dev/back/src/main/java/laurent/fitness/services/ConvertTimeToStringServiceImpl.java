package laurent.fitness.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.adaptater.FacilityAvailableAdaptater;

@Service
public class ConvertTimeToStringServiceImpl implements ConvertTimeToStringService {
	
	public String getStringOfTimestamp(Date timestamp){
		int year;
		String strMonth = "";
		String strDay = "";
		String strHour = "";
		String strMinute = "";
		Calendar calendar = Calendar.getInstance();

		calendar.setTime(new Date(timestamp.getTime() + 3600000));
		System.out.println("timestamp.toString() : " + timestamp.toString());
		//Mon Apr 22 12:00:00 CEST 2019 => 2019-04-22 12:00
		year =  calendar.get(Calendar.YEAR);
		strMonth = (calendar.get(Calendar.MONTH) +1 <10) ? "0" + (calendar.get(Calendar.MONTH) + 1) : "" + (calendar.get(Calendar.MONTH) + 1);
		strDay = (calendar.get(Calendar.DAY_OF_MONTH)<10) ? "0" + calendar.get(Calendar.DAY_OF_MONTH) : "" + calendar.get(Calendar.DAY_OF_MONTH);
		strHour = (calendar.get(Calendar.HOUR_OF_DAY) + 1 <10) ? "0" + (calendar.get(Calendar.HOUR_OF_DAY) + 1)  : "" + (calendar.get(Calendar.HOUR_OF_DAY) + 1);
		strMinute = (calendar.get(Calendar.MINUTE)<10) ? "0" + calendar.get(Calendar.MINUTE) : "" + calendar.get(Calendar.MINUTE);
		
		return year + "-" + strMonth + "-" + strDay + " " + strHour + ":" + strMinute + "%";
		

	}
}
