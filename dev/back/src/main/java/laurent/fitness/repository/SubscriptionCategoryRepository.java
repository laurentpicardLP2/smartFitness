package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.SubscriptionCategory;

public interface SubscriptionCategoryRepository extends JpaRepository<SubscriptionCategory, Integer> {
	@Query("SELECT sc FROM SubscriptionCategory sc WHERE sc.nameSubscription LIKE ?1")
	SubscriptionCategory findByNameSubscription(String nameSubscription);
	
	@Query("SELECT sc FROM SubscriptionCategory sc WHERE sc.idSubscriptionCategory = ?1")
	SubscriptionCategory findByIdSubscriptionCategory(int idSubscriptionCategory);
	
	@Query("SELECT sc.nameSubscription FROM SubscriptionCategory sc")
	List<String> findByNameSubscriptionsList();
	

}
