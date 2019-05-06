package laurent.fitness.services;

import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Service;


@Service
public class ConvertTimeToStringServiceImpl implements ConvertTimeToStringService {
	
	public String getStringOfTimestamp(Date timestamp){
		int year;
		String strMonth = "";
		String strDay = "";
		String strHour = "";
		String strMinute = "";
		Calendar calendar = Calendar.getInstance();
		
		calendar.setTime(new Date(timestamp.getTime()));
		year =  calendar.get(Calendar.YEAR);
		strMonth = (calendar.get(Calendar.MONTH) +1 <10) ? "0" + (calendar.get(Calendar.MONTH) + 1) : "" + (calendar.get(Calendar.MONTH) + 1);
		strDay = (calendar.get(Calendar.DAY_OF_MONTH)<10) ? "0" + calendar.get(Calendar.DAY_OF_MONTH) : "" + calendar.get(Calendar.DAY_OF_MONTH);
		strHour = (calendar.get(Calendar.HOUR_OF_DAY) <10) ? "0" + (calendar.get(Calendar.HOUR_OF_DAY))  : "" + (calendar.get(Calendar.HOUR_OF_DAY));
		strMinute = (calendar.get(Calendar.MINUTE)<10) ? "0" + calendar.get(Calendar.MINUTE) : "" + calendar.get(Calendar.MINUTE);
		
		return year + "-" + strMonth + "-" + strDay + " " + strHour + ":" + strMinute + "%";
		
	}
}
