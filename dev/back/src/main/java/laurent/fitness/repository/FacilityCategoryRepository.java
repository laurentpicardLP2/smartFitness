package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.FacilityCategory;

public interface FacilityCategoryRepository extends JpaRepository<FacilityCategory, Integer> {
	@Query("SELECT fc FROM FacilityCategory fc WHERE fc.nameFacilityCategory LIKE ?1")
	FacilityCategory findByFacilityCategoryName(String facilityCategoryName);
	
	@Query("SELECT fc FROM FacilityCategory fc WHERE fc.idFacilityCategory = ?1")
	FacilityCategory findByIdFacilityCategory(int idFacilityCategory);
	
	@Query(value = "SELECT facility_category.* FROM facility_category INNER JOIN facility ON"
			+ " facility_category.id_facility_Category = facility.facility_category_id_facility_category WHERE facility_category_id_facility_category = ?1", nativeQuery = true)
	FacilityCategory findByIdFacilityCategoryAssociateToFacility(int idFacility);

}
