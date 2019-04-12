package laurent.fitness.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;
import static org.mockito.BDDMockito.given;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import laurent.fitness.model.Facility;
import laurent.fitness.repository.FacilityCategoryRepository;
import laurent.fitness.repository.FacilityRepository;
import laurent.fitness.repository.MaintenanceOperationRepository;
import laurent.fitness.repository.RoomRepository;

@RunWith(MockitoJUnitRunner.class)
public class FacilityServiceImplTest {

	@Mock
	FacilityRepository facilityRepo;
	
	@Mock
	FacilityCategoryRepository facilityCategoryRepo;
	
	@Mock
	RoomRepository roomRepo;
	
	@Mock
	MaintenanceOperationRepository maintenanceOperationRepo;

	private FacilityService facilityService;

	@Before
	public void setUp() throws Exception {
		facilityService = new FacilityServiceImpl(facilityRepo, facilityCategoryRepo, roomRepo, maintenanceOperationRepo);
	}

	@Test
	public void getAllCities() {
		given(facilityRepo.findAll()).willReturn(new ArrayList<>());

		List<Facility> facilities = facilityService.getAllFacilities();

		assertThat(facilities).isNotNull();
	}

}
