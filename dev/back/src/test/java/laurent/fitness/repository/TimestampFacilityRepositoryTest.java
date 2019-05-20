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
import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Seance;
import laurent.fitness.model.TimestampFacility;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
public class TimestampFacilityRepositoryTest {
	
	@Autowired
	private CommandRepository commandRepo;
	
	@Autowired
	private SeanceRepository seanceRepo;
	
	@Autowired
	private CustomerRepository customerRepo;
		

	@Autowired
	private TestEntityManager testEntityManager;
	
	@Autowired
	private FacilityCategoryRepository facilityCategoryRepo;
	
	@Autowired
	private FacilityRepository facilityRepo;
	
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void testCSeance() {
		FacilityCategory facilityCategory = this.facilityCategoryRepo.findByFacilityCategoryName("Elliptique");
		Facility facility = this.facilityRepo.findByFacilityName("Elliptique 1");
		Customer customer = this.customerRepo.findByUsername("db_sebastien");
		Command savedCommand = testEntityManager.persistFlushFind(new Command(customer, new Date()));
		Command cmd = this.commandRepo.findByIdCommand(savedCommand.getIdCommand());
		List<Command> commands = new ArrayList<>();
		commands.add(cmd);
		Seance seance = this.seanceRepo.save(new Seance(commands, "Séance:seance"));
		
		TimestampFacility timestampFacility = new TimestampFacility(seance, facility, facilityCategory, new Date());
		
		assertThat(timestampFacility.getSeance().getIdItem()).isEqualTo(seance.getIdItem());
	}
	
	//Remarque : il n'y a pas besoin dede @Test deleteTimestampFacility car il n'y a jamais de requête directe 
		//depuis le front pour supprimer un timestampFacility

}
