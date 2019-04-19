package laurent.fitness.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Facility;
import laurent.fitness.model.adaptater.FacilityAdaptater;


public interface FacilityRepository extends JpaRepository<Facility, Integer> {
	
	@Query("SELECT f FROM Facility f WHERE f.idFacility = ?1")
	Facility findByIdFacility(int idFacility);
	
	@Query("SELECT f FROM Facility f WHERE f.nameFacility LIKE ?1")
	Facility findByFacilityName(String facilityName);
	
	@Query(value= "SELECT count(*) FROM facility WHERE facility_category_id_facility_category = ?1" , nativeQuery = true)
	int findByFacilityCategoryCount(int idFacilityCategory);
	
	@Query(value = "SELECT facility.* FROM facility INNER JOIN facility_category ON "
			+ " facility_category_id_facility_category = id_facility_category "
			+ " WHERE name_facility_category like ?1 AND id_facility NOT IN "
			+ " (SELECT facility_id_facility FROM timestamp_facility INNER JOIN facility_category ON "
			+ " facility_category_id_facility_category = id_facility_category WHERE date_of_timestamp like ?2 ) ", nativeQuery = true)
	List<Facility> findByFacilityAvailable(String facilityName, String timestampToString);
	
	@Query(value = "SELECT count(*) * (select price_seance from facility where id_facility = ?1) FROM db_fitness.timestamp_facility "
			+ "INNER JOIN db_fitness.seance ON seance_id_seance = id_item INNER JOIN db_fitness.facility "
			+ "ON id_facility = facility_id_facility WHERE facility_id_facility = ?1", nativeQuery = true)
	float findRevenueByFacility(int idFacility);
	
	@Query(value = "SELECT price_facility + sum(cost_of_intervention) FROM facility_has_maintenance_operation "
			+ "INNER JOIN db_fitness.maintenance_operation ON id_maintenance_operation = maintenance_operation_id_maintenance_operation "
			+ "INNER JOIN facility ON facility_id_facility = id_facility WHERE id_facility = ?1", nativeQuery = true)
	float findExpenditureByFacility(int idFacility);

	@Query(value= "SELECT name_Facility, price_seance FROM facility ORDER BY name_facility ASC" , nativeQuery = true)
	List<FacilityAdaptater> findAllFacilitiesByNameOrder();
	
	@Query("SELECT f.nameFacility FROM Facility f")
	List<String> findByNameFacilitiesList();
}
