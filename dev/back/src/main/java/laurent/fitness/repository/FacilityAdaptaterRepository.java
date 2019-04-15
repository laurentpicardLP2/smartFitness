package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import laurent.fitness.model.adaptater.FacilityAdaptater;

public interface FacilityAdaptaterRepository extends JpaRepository<FacilityAdaptater, Integer> {
	
}
