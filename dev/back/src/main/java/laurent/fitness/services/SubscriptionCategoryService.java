package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.SubscriptionCategory;

public interface SubscriptionCategoryService {
	public List<SubscriptionCategory> getAllSubscriptionCategories();
	
	public SubscriptionCategory saveSubscriptionCategory(SubscriptionCategory subscriptionCategory);
	
	public SubscriptionCategory updateSubscriptionCategory(int idSubscriptionCategory, String nameSubscription, int nbLast, String typeLast, float priceSubscription);
	
	public SubscriptionCategory updateSubscriptionCategory(String nameSubscription, int nbLast, String typeLast, float priceSubscription);
	
	public void deleteSubscriptionCategory(SubscriptionCategory subscriptionCategory);
	
	public SubscriptionCategory findByFacilityNameSubscription(String nameSubscription);
	
	public SubscriptionCategory findByIdSubscriptionCategory(int idSubscriptionCategory);
	
	public List<String> getListNameSubscriptions();
	

}
