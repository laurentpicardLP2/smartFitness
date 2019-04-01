package laurent.fitness.services;

import java.util.Date;
import java.util.List;

import laurent.fitness.model.Subscription;

public interface SubscriptionService {
	public Subscription createSubscription(int idCommand, String username, int idSubscriptionCategory, Date dateStartOfSubscription, Date dateEndOfSubscription);
	public List<Subscription> findAllSubscriptionsByUsername(String username);
	public Subscription findLastSubscriptionByUsername(String username);
	public Subscription findSubscriptionById(int idItem);
	public boolean findIsSubscribedByUsername(String username);
}
