package laurent.fitness.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Seance;

public interface SeanceRepository extends JpaRepository<Seance, Integer> {
	@Query("SELECT s FROM Seance s WHERE s.idItem = ?1")
	Seance findByIdItem(int idItem);
	
	
	@Query(value = "SELECT timestamp_facility.date_of_timestamp FROM db_fitness.timestamp_facility "
			+ " WHERE seance_id_seance = ?1 ORDER BY date_of_timestamp ASC limit 1 ", nativeQuery = true)
	Date findByDateOfTimestamp(int idItem);
	
	@Query(value = "SELECT count(*) FROM timestamp_facility INNER JOIN seance ON seance_id_seance = id_item "
			+ " WHERE id_item = ?1 ", nativeQuery = true)
	int findNbTimestampBySeance(int idItem);
	
	@Query(value = "SELECT seance.*, item.price, item.type_item FROM seance INNER JOIN item on seance.id_item = item.id_item WHERE customer_users_username like %?1% ORDER BY date_of_seance DESC ", nativeQuery = true)
	List<Seance> findSeancesByUsername(String username);
	

}
