package laurent.fitness.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.model.Seance;
import laurent.fitness.model.User;
import laurent.fitness.repository.CommandRepository;
import laurent.fitness.repository.CustomerRepository;
import laurent.fitness.repository.SeanceRepository;
import laurent.fitness.repository.UserRepository;

@Service
public class SeanceServiceImpl implements SeanceService {
	private CustomerRepository customerRepo;
	private CommandRepository commandRepo;
	private SeanceRepository seanceRepo;
	
	public SeanceServiceImpl(CustomerRepository customerRepo, CommandRepository commandRepo, SeanceRepository seanceRepo) {
		this.customerRepo = customerRepo;
		this.commandRepo = commandRepo;
		this.seanceRepo = seanceRepo;
	}

	@Override
	public List<Seance> getAllSeances() {
		// TODO Auto-generated method stub
		return this.seanceRepo.findAll();
	}

	@Override
	public Seance createSeance(int idCommand, String username, float price) {
		// TODO Auto-generated method stub
		List<Command> commands = new ArrayList<Command>();
		Customer customer = this.customerRepo.findByUsername(username);
		Command command = this.commandRepo.findByIdCommand(idCommand);
		commands.add(command);
		
		return this.seanceRepo.save(new Seance(commands, "Séance", customer, price));
	}
	
	@Override
	public Seance updateSeance(int idItem) {
		// TODO Auto-generated method stub
		Seance updatedSeance = this.findSeanceById(idItem);
		updatedSeance.setDateOfSeance(this.findByDateOfTimestamp(idItem));
		updatedSeance.setNbTimestamp(this.findNbTimestampBySeance(idItem));
		return this.seanceRepo.save(updatedSeance);
	}
	
	

	@Override
	public void deleteSeance(int idItem) {
		// TODO Auto-generated method stub
		this.seanceRepo.delete(this.seanceRepo.findByIdItem(idItem));
	}

	@Override
	public Seance findSeanceById(int idItem) {
		// TODO Auto-generated method stub
		return this.seanceRepo.findByIdItem(idItem);
	}

	@Override
	public Date findByDateOfTimestamp(int idItem) {
		// TODO Auto-generated method stub
		return this.seanceRepo.findByDateOfTimestamp(idItem);
	}

	@Override
	public int findNbTimestampBySeance(int idItem) {
		// TODO Auto-generated method stub
		return this.seanceRepo.findNbTimestampBySeance(idItem);
	}

	@Override
	public List<Seance> findSeancesByUsername(String username) {
		// TODO Auto-generated method stub
		return this.seanceRepo.findSeancesByUsername(username);
	}

}
