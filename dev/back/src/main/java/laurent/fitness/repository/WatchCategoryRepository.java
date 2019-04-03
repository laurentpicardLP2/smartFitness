package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.WatchCategory;

public interface WatchCategoryRepository  extends JpaRepository<WatchCategory, Integer> {
	@Query("SELECT w FROM WatchCategory w WHERE w.nameWatch LIKE ?1")
	WatchCategory findByNameWatch(String nameWatch);
	
	@Query("SELECT w FROM WatchCategory w WHERE w.idWatchCategory = ?1")
	WatchCategory findByIdWatchCategory(int idWatchCategory);
}
