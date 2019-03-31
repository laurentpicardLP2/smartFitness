package laurent.fitness.services;

import java.util.Date;
import java.util.List;

import laurent.fitness.model.Subscription;

public interface SubscriptionService {
	public Subscription createSubscription(int idCommand, String username, int idSubscriptionCategory, Date dateOfStartOfSubscription, Date dateOfEndOfSubscription);
	public List<Subscription> findSubscriptionsByUsername(String username);
	public Subscription findLastSubscriptionsByUsername(String username);
	public Subscription findSubscriptionById(int idItem);
	public boolean findIsSubscriptionsByUsername(String username);
}
