package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.FacilityCategory;

public interface FacilityCategoryRepository extends JpaRepository<FacilityCategory, Integer> {
	@Query("SELECT fc FROM FacilityCategory fc WHERE fc.nameFacilityCategory LIKE %?1%")
	FacilityCategory findByFacilityCategoryName(String facilityCategoryName);
	
	@Query("SELECT fc FROM FacilityCategory fc WHERE fc.idFacilityCategory = ?1")
	FacilityCategory findByIdFacilityCategory(int idFacilityCategory);
	
}
