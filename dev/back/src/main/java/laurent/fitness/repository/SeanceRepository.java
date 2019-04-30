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
	
	@Query(value = "SELECT seance.*, item.price, item.type_item, quantity_item FROM seance INNER JOIN item on seance.id_item = item.id_item WHERE item.price>0 AND customer_users_username like ?1 ORDER BY date_of_seance DESC ", nativeQuery = true)
	List<Seance> findSeancesByUsername(String username);

	@Query(value = "SELECT count(*) FROM db_fitness.timestamp_facility INNER JOIN db_fitness.seance ON seance_id_seance = id_item"
			+ "  WHERE date_of_timestamp like ?1 AND customer_users_username like ?2", nativeQuery = true)
	int findTimestampIsTakenByUsername(String timestampToString, String username);
	
	@Query(value = "SELECT count(*) FROM db_fitness.seance WHERE customer_users_username = ?1 AND status_seance=0", nativeQuery = true)
	int findAnotherSeanceIsOpenByUsername(String username);


}
