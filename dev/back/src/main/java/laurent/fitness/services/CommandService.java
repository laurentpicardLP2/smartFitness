package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Command;;

public interface CommandService {
	public List<Command> getAllCommands();
	public Command saveCommand(Command command);
	public void deleteCommand(Command command);
	public Command findByIdCommand(int idCommand);
	public List<Command> findCommandByUsername(String username);
}
