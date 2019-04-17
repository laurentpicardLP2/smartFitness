package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Command;;

public interface CommandService {
	public List<Command> getAllCommands();
	public Command saveCommand(Command command);
	public void deleteCommand(Command command);
	public Command findByIdCommand(int idCommand);
	public List<Command> findCommandsByUsername(String username);
	public void deleteCommandsZeroByUsername(String username);
	public boolean isCommandAlwaysExists(int idCommand);
	public boolean isDetectCommandZeroByUsername(String username);
	public Command setUpdateStatusAndPriceToCommand(int idCommand, float totalPrice);
}
