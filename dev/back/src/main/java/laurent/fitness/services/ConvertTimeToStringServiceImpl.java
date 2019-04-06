package laurent.fitness.services;

import java.time.Instant;
import java.time.LocalTime;
import java.util.ArrayList;
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
//		
//		System.out.println("new Date(timestamp.getTime() - 3600000).getHours() : " + new Date(timestamp.getTime() - 3600000).getHours());
//		System.out.println("new Date(timestamp.getTime()).getHours() : " + new Date(timestamp.getTime()).getHours());
//		System.out.println("timestamp.getTime() - 3600000: " + (timestamp.getTime() - 3600000));
//		System.out.println("timestamp.getTime() : " + (timestamp.getTime() ));
		//Mon Apr 22 12:00:00 CEST 2019 => 2019-04-22 12:00
		year =  calendar.get(Calendar.YEAR);
		strMonth = (calendar.get(Calendar.MONTH) +1 <10) ? "0" + (calendar.get(Calendar.MONTH) + 1) : "" + (calendar.get(Calendar.MONTH) + 1);
		strDay = (calendar.get(Calendar.DAY_OF_MONTH)<10) ? "0" + calendar.get(Calendar.DAY_OF_MONTH) : "" + calendar.get(Calendar.DAY_OF_MONTH);
		strHour = (calendar.get(Calendar.HOUR_OF_DAY) <10) ? "0" + (calendar.get(Calendar.HOUR_OF_DAY))  : "" + (calendar.get(Calendar.HOUR_OF_DAY));
		strMinute = (calendar.get(Calendar.MINUTE)<10) ? "0" + calendar.get(Calendar.MINUTE) : "" + calendar.get(Calendar.MINUTE);
		
		return year + "-" + strMonth + "-" + strDay + " " + strHour + ":" + strMinute + "%";
		

	}
}
