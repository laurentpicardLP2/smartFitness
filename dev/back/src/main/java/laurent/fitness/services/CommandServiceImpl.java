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
	public List<Command> findCommandsByUsername(String username) {
		// TODO Auto-generated method stub
		return this.commandRepo.findCommandsByUsername(username);
	}

	@Override
	public void deleteCommandsZeroByUsername(String username) {
		// TODO Auto-generated method stub
		List<Command> commands = this.commandRepo.findCommandsZeroByUsername(username);
		for (Command command : commands) {
			this.commandRepo.delete(command);
		}
	}

	@Override
	public boolean isCommandAlwaysExists(int idCommand) {
		// TODO Auto-generated method stub
		return this.commandRepo.findByIdCommand(idCommand) != null;
	}

	@Override
	public boolean isDetectCommandZeroByUsername(String username) {
		// TODO Auto-generated method stub
		List<Command> commands = this.commandRepo.findCountCommandsZeroSup1000ByUsername(username);
		for (Command command : commands) {
			this.commandRepo.delete(command);
		}
		return this.commandRepo.findCountCommandsZeroByUsername(username) > 0;
	}

	@Override
	public Command setUpdateStatusAndPriceToCommand(int idCommand, float totalPrice) {
		// TODO Auto-generated method stub
		Command command = this.commandRepo.findByIdCommand(idCommand);
		command.setStatusCommand(1);
		command.setTotalPrice(totalPrice);
		return this.saveCommand(command);
	}

}
