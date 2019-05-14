package laurent.fitness.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import laurent.fitness.model.Evenement;
import laurent.fitness.model.FacilityCategory;




@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace=Replace.NONE)
public class EvenementRepositoryTest {
	
	@Autowired
	private EvenementRepository evenementRepo;
	

	@Autowired
	private TestEntityManager testEntityManager;
	
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void testFindByIdEvenement() {
		Evenement ouvSmartFitness = evenementRepo.findByIdEvenement(1);
		assertThat(ouvSmartFitness.getTitleEvt()).isEqualTo("Evt 1");
	}
	
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void testFindByIdMaxEvenement() {
		assertThat(evenementRepo.findByIdMaxEvenement()).isEqualTo(4);
	}
	
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void testFindByEvenementInProgress() {
		assertThat((evenementRepo.findByEvenementInProgress()).size()).isEqualTo(3);
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void testFindByEvenementInSlotTime() {
		assertThat((evenementRepo.findByEvenementInSlotTime()).size()).isEqualTo(2);
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void testSaveEvenement() {
		Evenement savedEvenement = testEntityManager.persistFlushFind(new Evenement("Evt 5"));
		Evenement evt = evenementRepo.findByIdEvenement(5);
		assertThat(evt.getTitleEvt()).isEqualTo(savedEvenement.getTitleEvt());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void testDeleteEvenement() {
		Evenement evt = evenementRepo.findByIdEvenement(5);
		evenementRepo.delete(evt);
		assertThat(evenementRepo.findByIdEvenement(5)).isNull();
	}
}
