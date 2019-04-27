package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Evenement;

public interface EvenementRepository extends JpaRepository<Evenement, Integer> {
	@Query("SELECT e FROM Evenement e WHERE e.idEvt = ?1")
	Evenement findByIdEvenement(int idEvt);
	
	@Query(value = "select max(id_evt) FROM evenement ", nativeQuery = true)
	public int findByIdMaxEvenement();
	
	@Query(value = "SELECT * FROM evenement WHERE end_date_time_evt > current_timestamp()", nativeQuery = true)
	public List<Evenement> findByEvenementInProgress();
	
	@Query(value = "SELECT * FROM evenement WHERE current_timestamp() >= start_date_time_evt AND current_timestamp() <= end_date_time_evt", nativeQuery = true)
	List<Evenement> findByEvenementInSlotTime();
}
