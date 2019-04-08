package laurent.fitness.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.model.Subscription;
import laurent.fitness.model.Watch;
import laurent.fitness.model.WatchCategory;
import laurent.fitness.repository.CommandRepository;
import laurent.fitness.repository.CustomerRepository;
import laurent.fitness.repository.WatchCategoryRepository;
import laurent.fitness.repository.WatchRepository;

@Service
public class WatchServiceImpl implements WatchService {
	
	private CommandRepository commandRepo;
	private CustomerRepository customerRepo;
	private WatchCategoryRepository watchCategoryRepo;
	private WatchRepository watchRepo;
	
	
	public WatchServiceImpl(CommandRepository commandRepo, CustomerRepository customerRepo, WatchCategoryRepository watchCategoryRepo, WatchRepository watchRepo) {
		this.commandRepo = commandRepo;
		this.customerRepo = customerRepo;
		this.watchCategoryRepo = watchCategoryRepo;
		this.watchRepo = watchRepo;
	}
	
	@Override
	public Watch createWatch(int idCommand, int idWatchCategory, String username) {
		// TODO Auto-generated method stub
		List<Command> commands = new ArrayList<Command>();
		Command command = this.commandRepo.findByIdCommand(idCommand);
		commands.add(command);
		Customer customer = this.customerRepo.findByUsername(username);
		WatchCategory watchCategory = this.watchCategoryRepo.findByIdWatchCategory(idWatchCategory);
		return this.watchRepo.save(new Watch(commands, watchCategory.getNameWatch() + ":watch", watchCategory.getPriceWatch(), customer, watchCategory));
	}

	@Override
	public Watch findWatchByIdItem(int idItem) {
		// TODO Auto-generated method stub
		return this.watchRepo.findByIdItem(idItem);
	}

}
