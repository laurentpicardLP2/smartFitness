package laurent.fitness.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Date;

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

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
public class CommandRepositoryTest {
	@Autowired
	private CommandRepository commandRepo;
	
	@Autowired
	private CustomerRepository customerRepo;
		

	@Autowired
	private TestEntityManager testEntityManager;
	
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void testDelCommand() {
		this.commandRepo.delete(this.commandRepo.findByIdCommand(5));
		assertThat(this.commandRepo.findByIdCommand(5)).isNull();
	}

	
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void testCreateNewCommand(){
		Customer customer = this.customerRepo.findByUsername("db_sebastien");
		Command savedCommand = testEntityManager.persistFlushFind(new Command(customer, new Date()));
		Command cmd = this.commandRepo.findByIdCommand(savedCommand.getIdCommand());
		assertThat(cmd.getCustomer().getUsername()).isEqualTo(savedCommand.getCustomer().getUsername());
	}

	

}
