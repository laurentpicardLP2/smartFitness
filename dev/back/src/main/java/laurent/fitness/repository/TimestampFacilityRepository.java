package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.TimestampFacility;

public interface TimestampFacilityRepository extends JpaRepository <TimestampFacility, Integer> {


//	@Query(value = "SELECT (facility_category.quantity) - "
//			+ " (SELECT COUNT(*) FROM timestamp_facility INNER JOIN facility ON timestamp_facility.facility_id_facility = ( "
//			+ " SELECT  facility.id_facility FROM facility INNER JOIN facility_category ON "
//			+ " facility.facility_category_id_facility_category = facility_category.id_facility_category "
//			+ "  WHERE facility_category.facility_category_name like %?1%) "
//			+ " WHERE timestamp_facility.ref_timestamp like %?2%) "
//			+ " FROM facility_category WHERE facility_category.facility_category_name like %?1%", nativeQuery = true)

	
	@Query(value = "SELECT (facility_category.quantity_facility_category) - "
			+ " (SELECT COUNT(*) FROM timestamp_facility INNER JOIN facility_category ON "
			+ " timestamp_facility.facility_category_id_facility_category = facility_category.id_facility_category "
			+ "  WHERE facility_category.name_facility_category like ?1 AND timestamp_facility.date_of_timestamp like ?2 ) "
			+ " FROM facility_category WHERE facility_category.name_facility_category like ?1", nativeQuery = true)
	int findByFacilityCategoryCount(String nameFacilityCategory, String timestamp);
	
	@Query(value = "SELECT * FROM db_fitness.timestamp_facility WHERE seance_id_seance = ?1 ORDER BY date_of_timestamp ASC", nativeQuery = true)
	List<TimestampFacility> findTimestampByIdSeance(int idItem);
	
	@Query(value = "SELECT count(*) FROM db_fitness.timestamp_facility WHERE month(date_of_timestamp) = ?1 and year(date_of_timestamp) = ?2", nativeQuery = true)
	int findTimestampByMonth(int pMonth, int pYear);
	

}

//@Query(value = "SELECT date_of_timestamp  FROM db_fitness.timestamp_facility \n" + 
//"   WHERE seance_id_seance = ?1 ", nativeQuery = true)
//List<TimestampFacilitiesForASeanceAdaptater> findTimestampByIdItem(int idItem);

//@Query(value = "SELECT dayname(date_of_timestamp), dayofmonth(date_of_timestamp), monthname(date_of_timestamp), year(date_of_timestamp) \n" + 
//"	hour(date_of_timestamp), minute(date_of_timestamp), name_facility, name_facility_category  FROM db_fitness.timestamp_facility \n" + 
//"	INNER JOIN facility ON facility_id_facility = id_facility\n" + 
//"	INNER JOIN facility_category ON timestamp_facility.facility_category_id_facility_category = facility_category.id_facility_category\n" + 
//"   WHERE seance_id_seance = ?1 ", nativeQuery = true)
//List<TimestampFacilitiesForASeanceAdaptater> findTimestampByIdItem(int idItem);
