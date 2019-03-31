package laurent.fitness.services;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Subscription;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {

	@Override
	public Subscription createSubscription(int idCommand, String username, int idSubscriptionCategory,
			Date dateOfStartOfSubscription, Date dateOfEndOfSubscription) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Subscription> findSubscriptionsByUsername(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Subscription findLastSubscriptionsByUsername(String username) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Subscription findSubscriptionById(int idItem) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean findIsSubscriptionsByUsername(String username) {
		// TODO Auto-generated method stub
		return false;
	}

}
