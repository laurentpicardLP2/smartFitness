package laurent.fitness.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import laurent.fitness.model.FacilityCategory;
import laurent.fitness.services.FacilityService;




@RunWith(SpringRunner.class)
@DataJpaTest
//@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
@AutoConfigureTestDatabase(replace=Replace.NONE)
public class FacilityRepositoryTest {
	
	@Autowired
	private FacilityCategoryRepository facilityCategoryRepo;

	@Autowired
	private TestEntityManager testEntityManager;
	

	@Test
	@WithMockUser(roles={"ADMIN"})
	public void testFindByFacilityName() {
		FacilityCategory savedFacilityCategory = testEntityManager.persistFlushFind(new FacilityCategory("Musculature", 4));
		FacilityCategory musculature = facilityCategoryRepo.findByFacilityCategoryName("Musculature");
		assertThat(musculature.getNameFacilityCategory()).isEqualTo(savedFacilityCategory.getNameFacilityCategory());
		assertThat(musculature.getQuantityFacilityCategory()).isEqualTo(savedFacilityCategory.getQuantityFacilityCategory());
	}

}
