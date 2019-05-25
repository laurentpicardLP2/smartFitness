package laurent.fitness.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import laurent.fitness.model.TimestampFacility;
import laurent.fitness.repository.FacilityCategoryRepository;
import laurent.fitness.repository.FacilityRepository;
import laurent.fitness.repository.SeanceRepository;
import laurent.fitness.repository.TimestampFacilityRepository;

@RunWith(MockitoJUnitRunner.class)
public class TimestampFacilityServiceImplTest {

	@Mock
	TimestampFacilityRepository timestampFacilityRepo;
	
	@Mock
	SeanceRepository seanceRepo;
	
	@Mock
	FacilityRepository facilityRepo;
	
	@Mock
	FacilityCategoryRepository facilityCategoryRepo;


	private TimestampFacilityService timestampFacilityService;

	@Before
	public void setUp() throws Exception {
		timestampFacilityService = new TimestampFacilityServiceImpl(timestampFacilityRepo, seanceRepo, facilityRepo, facilityCategoryRepo);
	}
	

	@Test
	public void createTimestampFacility() {
		TimestampFacility timestampFacility = new TimestampFacility();
		given(timestampFacilityRepo.save(timestampFacility)).willReturn(new TimestampFacility());

		

		timestampFacilityService.saveTimestampFacility(timestampFacility);
		assertThat(timestampFacility.getClass()).isEqualTo(timestampFacility.getClass());
	}
	
	//Remarque : il n'y a pas besoin dede @Test deleteTimestampFacility car il n'y a jamais de requête directe 
	//depuis le front pour supprimer un timestampFacility
}
