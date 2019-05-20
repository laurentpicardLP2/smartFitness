package laurent.fitness.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import java.util.Date;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.repository.CommandRepository;

@RunWith(MockitoJUnitRunner.class)
public class CommandServiceImplTest {
	
	@Mock
	CommandRepository commandRepo;

	private CommandService commandService;

	@Before
	public void setUp() throws Exception {
		commandService = new CommandServiceImpl(commandRepo);
	}
	
	@Test
	public void createCommand() {
		Command command = new Command(new Customer("db_sebastien"), new Date());
		given(commandRepo.save(command)).willReturn(new Command(new Customer("db_sebastien"), new Date()));

		Command savedCommand = commandService.saveCommand(command);
		assertThat(savedCommand.getCustomer().getUsername()).isEqualTo("db_sebastien");
	}
	
	@Test
	public void deleteCommand() {
		Command command = commandRepo.findByIdCommand(1);
		commandRepo.delete(command);

		Mockito.verify(commandRepo).delete(command);
	}

}
