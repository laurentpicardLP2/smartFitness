package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.WatchCategory;

public interface WatchCategoryRepository  extends JpaRepository<WatchCategory, Integer> {
	@Query("SELECT wc FROM WatchCategory wc WHERE wc.nameWatch LIKE ?1")
	WatchCategory findByNameWatch(String nameWatch);
	
	@Query("SELECT wc FROM WatchCategory wc WHERE wc.idWatchCategory = ?1")
	WatchCategory findByIdWatchCategory(int idWatchCategory);
	
	@Query("SELECT wc.nameWatch FROM WatchCategory wc")
	List<String> findByNameWatchesList();
}
