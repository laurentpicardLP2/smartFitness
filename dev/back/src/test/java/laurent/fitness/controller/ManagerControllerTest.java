package laurent.fitness.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import laurent.fitness.services.FacilityService;

@RunWith(SpringRunner.class)
//@RunWith(MockitoJUnitRunner.class)
@WebMvcTest 
//@SpringBootTest
//@AutoConfigureMockMvc 
//@TestExecutionListeners(mergeMode = MergeMode.MERGE_WITH_DEFAULTS, listeners = {WithSecurityContextTestExecutionListener.class })
public class ManagerControllerTest {
	
	@Autowired
	MockMvc mockMvc;

	@MockBean
	FacilityService facilityService;
	
	@Test
//	@WithMockUser(roles={"ADMIN"})
	public void getFacilities() throws Exception {
		when(this.facilityService.getAllFacilities()).thenReturn(new ArrayList<>());
		
		this.mockMvc.perform(get("/managerctrl/getfacilities")).andExpect(status().isOk());
	}
	
/*	
	@Mock
	Repo joueurRepo


	@Test
	@WithMockUser(role=("ADMIN"))
	public void testGetFacilities() {
		given(monRepo.findAll()).willReturn(ArrayList<>())
		
		List<Joueurs> joueurs = joueurRepo.findAll();
		assertThat(joeurs).isNotNull();
		fail("Not yet implemented");
	}
*/
}


// given(

//
//@GetMapping("/getfacilities")
//public List<Facility> getFacilities() {
//	return(this.facilityService.getAllFacilities());			
//}
