package laurent.fitness.services;

import java.util.Date;
import java.util.List;

import laurent.fitness.model.Subscription;

public interface SubscriptionService {
	public Subscription addSubscription(int idCommand, String username, int idSubscriptionCategory, Date dateStartOfSubscription, Date dateEndOfSubscription);
	public List<Subscription> findHistoricSubscriptionsByUsername(String username);
	public List<Subscription> findActiveSubscriptionsByUsername(String username);
	public List<Subscription> findNextSubscriptionsByUsername(String username);
	public Subscription findSubscriptionById(int idItem);
	public boolean findIsSubscribedByUsername(String username);
}
