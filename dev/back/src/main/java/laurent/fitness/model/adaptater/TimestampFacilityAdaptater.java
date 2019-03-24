package laurent.fitness.model.adaptater;

import java.util.Date;

public class TimestampFacilityAdaptater {
	private Date dateOfTimestampStart;
	private Date dateOfTimestampEnd;
	private String dayName;
	private int dayOfMonth;
	private String monthName;
	private int year;
	private int hourStart;
	private int minuteStart;
	private int hourEnd;
	private int minuteEnd;
	private String nameFacility;
	private String nameFacilityCategory;
	
	public TimestampFacilityAdaptater() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public TimestampFacilityAdaptater(
			Date dateOfTimestampStart, 
			Date dateOfTimestampEnd, 
			String dayName, 
			int dayOfMonth, 
			String monthName, 
			int year, 
			int hourStart, 
			int minuteStart, 
			int hourEnd, 
			int minuteEnd,
			String nameFacility, 
			String nameFacilityCategory) {
		super();
		// TODO Auto-generated constructor stub
		this.dateOfTimestampStart = dateOfTimestampStart;
		this.dateOfTimestampEnd = dateOfTimestampEnd;
		this.dayName = dayName;
		this.dayOfMonth = dayOfMonth;
		this.monthName = monthName;
		this.year = year;
		this.hourStart = hourStart;
		this.minuteStart =minuteStart;
		this.hourEnd = hourEnd;
		this.minuteEnd = minuteEnd;
		this.nameFacility = nameFacility;
		this.nameFacilityCategory = nameFacilityCategory;
	}
	

	public Date getDateOfTimestampStart() {
		return dateOfTimestampStart;
	}

	public void setDateOfTimestampStart(Date dateOfTimestampStart) {
		this.dateOfTimestampStart = dateOfTimestampStart;
	}

	public Date getDateOfTimestampEnd() {
		return dateOfTimestampEnd;
	}

	public void setDateOfTimestampEnd(Date dateOfTimestampEnd) {
		this.dateOfTimestampEnd = dateOfTimestampEnd;
	}

	public String getDayName() {
		return dayName;
	}

	public void setDayName(String dayName) {
		this.dayName = dayName;
	}

	public int getDayOfMonth() {
		return dayOfMonth;
	}

	public void setDayOfMonth(int dayOfMonth) {
		this.dayOfMonth = dayOfMonth;
	}

	public String getMonthName() {
		return monthName;
	}

	public void setMonthName(String monthName) {
		this.monthName = monthName;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public int getHourStart() {
		return hourStart;
	}

	public void setHourStart(int hourStart) {
		this.hourStart = hourStart;
	}

	public int getMinuteStart() {
		return minuteStart;
	}

	public void setMinuteStart(int minuteStart) {
		this.minuteStart = minuteStart;
	}

	public int getHourEnd() {
		return hourEnd;
	}

	public void setHourEnd(int hourEnd) {
		this.hourEnd = hourEnd;
	}

	public int getMinuteEnd() {
		return minuteEnd;
	}

	public void setMinuteEnd(int minuteEnd) {
		this.minuteEnd = minuteEnd;
	}

	public String getNameFacility() {
		return nameFacility;
	}

	public void setNameFacility(String nameFacility) {
		this.nameFacility = nameFacility;
	}

	public String getNameFacilityCategory() {
		return nameFacilityCategory;
	}

	public void setNameFacilityCategory(String nameFacilityCategory) {
		this.nameFacilityCategory = nameFacilityCategory;
	}

}
