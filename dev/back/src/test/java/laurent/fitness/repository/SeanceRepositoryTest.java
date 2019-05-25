package laurent.fitness.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import laurent.fitness.model.Command;
import laurent.fitness.model.Customer;
import laurent.fitness.model.Seance;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
public class SeanceRepositoryTest {
	@Autowired
	private CommandRepository commandRepo;
	
	@Autowired
	private SeanceRepository seanceRepo;
	
	@Autowired
	private CustomerRepository customerRepo;
		

	@Autowired
	private TestEntityManager testEntityManager;

	

	
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void testCSeance() {
		
		Customer customer = this.customerRepo.findByUsername("db_sebastien");
		Command savedCommand = testEntityManager.persistFlushFind(new Command(customer, new Date()));
		Command cmd = this.commandRepo.findByIdCommand(savedCommand.getIdCommand());
		List<Command> commands = new ArrayList<>();
		commands.add(cmd);
		Seance seance = new Seance(commands, "Séance:seance");
		Seance savedSeance = this.seanceRepo.save(seance);
		assertThat(seance.getNbTimestamp()).isEqualTo(savedSeance.getNbTimestamp());
	}
	
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void testDeleteNewSeance(){
		this.seanceRepo.delete(this.seanceRepo.findByIdItem(5));
		assertThat(this.seanceRepo.findByIdItem(1)).isNull();
		
	}

}
