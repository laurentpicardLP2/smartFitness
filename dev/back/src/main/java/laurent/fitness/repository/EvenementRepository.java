package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Evenement;

public interface EvenementRepository extends JpaRepository<Evenement, Integer> {
	@Query("SELECT fc FROM FacilityCategory fc WHERE fc.idFacilityCategory = ?1")
	Evenement findByIdEvenement(int idEvt);
}
