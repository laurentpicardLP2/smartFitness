package laurent.fitness.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import laurent.fitness.model.Evenement;
import laurent.fitness.model.Facility;
import laurent.fitness.repository.EvenementRepository;
import laurent.fitness.repository.FacilityCategoryRepository;
import laurent.fitness.repository.FacilityRepository;
import laurent.fitness.repository.MaintenanceOperationRepository;
import laurent.fitness.repository.RoomRepository;

@RunWith(MockitoJUnitRunner.class)
public class EvenementServiceImplTest {
	@Mock
	EvenementRepository evenementRepo;

	private EvenementService evenementService;

	@Before
	public void setUp() throws Exception {
		evenementService = new EvenementServiceImpl(evenementRepo);
	}
	
	@Test
	public void getAllEvenements() {
		given(evenementRepo.findAll()).willReturn(new ArrayList<>());

		List<Evenement> evenements = evenementService.findAllEvenement();

		assertThat(evenements).isNotNull();
	}

	@Test
	public void getEvenementInProgress() {
		given(evenementRepo.findByEvenementInProgress()).willReturn(new ArrayList<>());

		List<Evenement> evenements = evenementService.getEvenementInProgress();

		assertThat(evenements).isNotNull();
	}
	
	@Test
	public void getEvenementInSlotTime() {
		given(evenementRepo.findByEvenementInSlotTime()).willReturn(new ArrayList<>());

		List<Evenement> evenements = evenementService.getEvenementInSlotTime();

		assertThat(evenements).isNotNull();
	}
	
	
	@Test
	public void getIdMaxEvenement() {
		given(evenementRepo.findByIdMaxEvenement()).willReturn(1);

		int idMax = evenementService.getIdMaxEvenement();

		assertThat(idMax).isEqualTo(1);
	}
	
	@Test
	public void getEvenementById() {
		given(evenementRepo.findByIdEvenement(1)).willReturn(new Evenement("Cours Fitness"));

		Evenement evenement = evenementService.findEvenementById(1);

		assertThat(evenement.getTitleEvt()).isEqualTo(new String("Cours Fitness"));
	}
	
	@Test
	public void createEvenement() {
		Evenement ouvSmartFitness = new Evenement("Ouverture Smart Fitness");
		given(evenementRepo.save(ouvSmartFitness)).willReturn(new Evenement("Ouverture Smart Fitness"));

		Evenement savedOuvSmartFitness = evenementService.saveEvenement(ouvSmartFitness);

		assertThat(savedOuvSmartFitness.getTitleEvt()).isEqualTo("Ouverture Smart Fitness");
	}
}
