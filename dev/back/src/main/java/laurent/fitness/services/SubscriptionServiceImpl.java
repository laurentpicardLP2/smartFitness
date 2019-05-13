package laurent.fitness.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.model.Subscription;
import laurent.fitness.model.SubscriptionCategory;
import laurent.fitness.repository.CommandRepository;
import laurent.fitness.repository.CustomerRepository;
import laurent.fitness.repository.SubscriptionCategoryRepository;
import laurent.fitness.repository.SubscriptionRepository;

@Service
public class SubscriptionServiceImpl implements SubscriptionService {
	private CustomerRepository customerRepo;
	private CommandRepository commandRepo;
	private SubscriptionCategoryRepository subscriptionCategoryRepo;
	private SubscriptionRepository subscriptionRepo;
	
	public SubscriptionServiceImpl(CustomerRepository customerRepo, CommandRepository commandRepo,
			SubscriptionCategoryRepository subscriptionCategoryRepo, SubscriptionRepository subscriptionRepo) {
		this.customerRepo = customerRepo;
		this.commandRepo = commandRepo;
		this.subscriptionCategoryRepo = subscriptionCategoryRepo;
		this.subscriptionRepo = subscriptionRepo;
	}


	@Override
	public Subscription addSubscription(int idCommand, String username, int idSubscriptionCategory,
			Date dateStartOfSubscription, Date dateEndOfSubscription) {
		List<Command> commands = new ArrayList<Command>();
		Customer customer = this.customerRepo.findByUsername(username);
		Command command = this.commandRepo.findByIdCommand(idCommand);
		commands.add(command);
		SubscriptionCategory subscriptionCategory = this.subscriptionCategoryRepo.findByIdSubscriptionCategory(idSubscriptionCategory);
		return this.subscriptionRepo.save(new Subscription(commands, subscriptionCategory.getNameSubscription() + ":subscription", customer, subscriptionCategory.getPriceSubscription(), 
				subscriptionCategory, dateStartOfSubscription, dateEndOfSubscription, 1));
	}

	@Override
	public List<Subscription> findHistoricSubscriptionsByUsername(String username) {
		return this.subscriptionRepo.findHistoricSubscriptionsByUsername(username);
	}

	@Override
	public List<Subscription> findActiveSubscriptionsByUsername(String username) {
		return this.subscriptionRepo.findActiveSubscriptionsByUsername(username);
	}

	@Override
	public Subscription findSubscriptionById(int idItem) {
		return this.subscriptionRepo.findByIdItem(idItem);
	}

	@Override
	public boolean findIsSubscribedByUsername(String username) {
		return this.subscriptionRepo.findIsSubscridebByUsername(username) > 0;
	}


	@Override
	public List<Subscription> findNextSubscriptionsByUsername(String username) {
		return this.subscriptionRepo.findNextSubscriptionsByUsername(username);
	}

}
