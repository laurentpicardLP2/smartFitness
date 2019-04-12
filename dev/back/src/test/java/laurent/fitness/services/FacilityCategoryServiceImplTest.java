package laurent.fitness.services;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;
import static org.mockito.BDDMockito.given;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import laurent.fitness.model.FacilityCategory;
import laurent.fitness.repository.FacilityCategoryRepository;

@RunWith(MockitoJUnitRunner.class)
public class FacilityCategoryServiceImplTest {
	
	@Mock
	FacilityCategoryRepository facilityCategoryRepo;
	

	private FacilityCategoryService facilityCategoryService;

	@Before
	public void setUp() throws Exception {
		facilityCategoryService = new FacilityCategoryServiceImpl(facilityCategoryRepo);
	}

	@Test
	public void testSaveFacilityCategory() {
		FacilityCategory musculature = new FacilityCategory("Muculature", 4);
		given(facilityCategoryRepo.save(musculature)).willReturn(new FacilityCategory("Musculature", 4));

		FacilityCategory savedMusculature = facilityCategoryService.saveFacilityCategory(musculature);

		assertThat(savedMusculature.getNameFacilityCategory()).isEqualTo("Musculature");
		assertThat(savedMusculature.getQuantityFacilityCategory()).isEqualTo(4);
	}
	
	@Test
	public void testFindByFacilityCategoryName() {
		given(facilityCategoryRepo.findByFacilityCategoryName("Elliptique")).willReturn(new FacilityCategory("Elliptique", 3));

		FacilityCategory elliptique = facilityCategoryService.findByFacilityCategoryName("Elliptique");

		assertThat(elliptique.getNameFacilityCategory()).isEqualTo("Elliptique");
		assertThat(elliptique.getQuantityFacilityCategory()).isEqualTo(3);
	}
	
	
	

}
