package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Watch;


public interface WatchRepository extends JpaRepository<Watch, Integer> {
	@Query("SELECT w FROM Watch w WHERE w.idItem = ?1")
	Watch findByIdItem(int idItem);

}
