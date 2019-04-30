package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Subscription;

public interface SubscriptionRepository  extends JpaRepository<Subscription, Integer> {
	@Query("SELECT s FROM Subscription s WHERE s.idItem = ?1")
	Subscription findByIdItem(int idItem);
	
	@Query(value = "SELECT count(*) FROM subscription WHERE customer_users_username like ?1 AND date_start_of_subscription <= current_date()\n" + 
			" AND date_end_of_subscription >= current_date()", nativeQuery = true)
	int findIsSubscridebByUsername(String username);
	
	@Query(value = "SELECT subscription.*, item.price, item.type_item, item.quantity_item FROM subscription INNER JOIN item on subscription.id_item = item.id_item WHERE item.price>0 AND customer_users_username like ?1 AND date_end_of_subscription < current_date() ORDER BY date_start_of_subscription DESC ", nativeQuery = true)
	List<Subscription> findHistoricSubscriptionsByUsername(String username);

	@Query(value = "SELECT subscription.*, item.price, item.type_item, item.quantity_item FROM subscription INNER JOIN item on subscription.id_item = item.id_item WHERE item.price>0 AND customer_users_username like ?1 AND date_start_of_subscription <= current_date()\n" + 
			" AND date_end_of_subscription >= current_date()", nativeQuery = true)
	List<Subscription> findActiveSubscriptionsByUsername(String username);

	@Query(value = "SELECT subscription.*, item.price, item.type_item, item.quantity_item FROM subscription INNER JOIN item on subscription.id_item = item.id_item WHERE item.price>0 AND customer_users_username like ?1 AND date_start_of_subscription > current_date() ORDER BY date_start_of_subscription DESC ", nativeQuery = true)
	List<Subscription> findNextSubscriptionsByUsername(String username);

}
