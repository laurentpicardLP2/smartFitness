package laurent.fitness.services;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.model.Item;
import laurent.fitness.model.Seance;
import laurent.fitness.repository.ItemRepository;
import laurent.fitness.repository.SeanceRepository;

@RunWith(MockitoJUnitRunner.class)
public class SeanceServiceImplTest {
	@Mock
	private ItemRepository itemRepo;
	
	@Mock
	private SeanceRepository seanceRepo;
	

	@Before
	public void setUp() throws Exception {
	}
	
	@Test
	public void createSeance() {
		
		Command command = new Command(new Customer("db_sebastien"), new Date());		
		List<Command> commands = new ArrayList<>();
		commands.add(command);
		Item item = new Item(commands, "Séance:seance");
		assertThat(item.getQuantityItem()).isEqualTo(0);
	}
	
	@Test
	public void deleteCommand() {
		Seance seance = seanceRepo.findByIdItem(1);
		seanceRepo.delete(seance);

		Mockito.verify(seanceRepo).delete(seance);
	}
}
