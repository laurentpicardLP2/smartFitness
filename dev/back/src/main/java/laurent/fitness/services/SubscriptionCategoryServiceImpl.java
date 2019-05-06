package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.SubscriptionCategory;
import laurent.fitness.repository.SubscriptionCategoryRepository;

@Service
public class SubscriptionCategoryServiceImpl implements SubscriptionCategoryService {
	
	private SubscriptionCategoryRepository subscriptionCategoryRepo;
	
	public SubscriptionCategoryServiceImpl(SubscriptionCategoryRepository subscriptionCategoryRepo) {
		this.subscriptionCategoryRepo = subscriptionCategoryRepo;
	}

	@Override
	public List<SubscriptionCategory> getAllSubscriptionCategories() {
		// TODO Auto-generated method stub
		return this.subscriptionCategoryRepo.findAll();
	}

	@Override
	public SubscriptionCategory saveSubscriptionCategory(SubscriptionCategory subscriptionCategory) {
		// TODO Auto-generated method stub
		return this.subscriptionCategoryRepo.save(subscriptionCategory);
	}

	@Override
	public SubscriptionCategory updateSubscriptionCategory(int idSubscriptionCategory, String nameSubscription,
			int nbLast, String typeLast, float priceSubscription) {
		// TODO Auto-generated method stub
		SubscriptionCategory subscriptionCategory = this.subscriptionCategoryRepo.findByIdSubscriptionCategory(idSubscriptionCategory);
		subscriptionCategory.setNameSubscription(nameSubscription);
		subscriptionCategory.setNbLast(nbLast);
		subscriptionCategory.setTypeLast(typeLast);
		subscriptionCategory.setPriceSubscription(priceSubscription);
		return this.subscriptionCategoryRepo.save(subscriptionCategory);

	}

	@Override
	public SubscriptionCategory updateSubscriptionCategory(String nameSubscription, int nbLast, String typeLast,
			float priceSubscription) {
		// TODO Auto-generated method stub
		SubscriptionCategory subscriptionCategory = this.subscriptionCategoryRepo.findByNameSubscription(nameSubscription);
		subscriptionCategory.setNbLast(nbLast);
		subscriptionCategory.setTypeLast(typeLast);
		subscriptionCategory.setPriceSubscription(priceSubscription);
		return this.subscriptionCategoryRepo.save(subscriptionCategory);
	}

	@Override
	public void deleteSubscriptionCategory(SubscriptionCategory subscriptionCategory) {
		// TODO Auto-generated method stub
		this.subscriptionCategoryRepo.delete(subscriptionCategory);
	}

	@Override
	public SubscriptionCategory findByFacilityNameSubscription(String nameSubscription) {
		// TODO Auto-generated method stub
		return this.subscriptionCategoryRepo.findByNameSubscription(nameSubscription);
	}

	@Override
	public SubscriptionCategory findByIdSubscriptionCategory(int idSubscriptionCategory) {
		// TODO Auto-generated method stub
		return this.subscriptionCategoryRepo.findByIdSubscriptionCategory(idSubscriptionCategory);
	}

	@Override
	public List<String> getListNameSubscriptions() {
		// TODO Auto-generated method stub
		return this.subscriptionCategoryRepo.findByNameSubscriptionsList();
	}

}
