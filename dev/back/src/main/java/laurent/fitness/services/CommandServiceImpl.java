package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Command;
import laurent.fitness.repository.CommandRepository;

@Service
public class CommandServiceImpl implements CommandService {
	
	private CommandRepository commandRepo;

    public CommandServiceImpl(CommandRepository commandRepo) {
        this.commandRepo = commandRepo;
    }

	@Override
	public List<Command> getAllCommands() {
		// TODO Auto-generated method stub
		return this.commandRepo.findAll();
	}

	@Override
	public Command saveCommand(Command command) {
		// TODO Auto-generated method stub
		return this.commandRepo.save(command);
	}

	@Override
	public void deleteCommand(Command command) {
		// TODO Auto-generated method stub
		this.commandRepo.delete(command);
	}

	@Override
	public Command findByIdCommand(int idCommand) {
		// TODO Auto-generated method stub
		return this.commandRepo.findByIdCommand(idCommand);
	}

	@Override
	public List<Command> findCommandByUsername(String username) {
		// TODO Auto-generated method stub
		return this.commandRepo.findCommandsByUsername(username);
	}

}
