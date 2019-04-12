package laurent.fitness.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import laurent.fitness.model.FacilityCategory;
import laurent.fitness.services.FacilityCategoryService;
import laurent.fitness.services.FacilityService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class ManagerControllerTest {
	
	@Autowired
	MockMvc mockMvc;

	@MockBean
	FacilityService facilityService;
	
	@MockBean
	FacilityCategoryService facilityCategoryService;
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getFacilities() throws Exception {
		when(this.facilityService.getAllFacilities()).thenReturn(new ArrayList<>());
		
		this.mockMvc.perform(get("/managerctrl/getfacilities")).andExpect(status().isOk());
	}
	
	@Test
    @WithMockUser(roles = { "ADMIN" })
    public void getFacilityCategoryAssociateToFacility() throws Exception {
		when(this.facilityCategoryService.getFacilityCategoryAssociateToFacility(2)).thenReturn(new FacilityCategory("Elliptique", 3));
		
       this.mockMvc.perform(get("/managerctrl/getfacilitycategoryassociatetofacility/2")).andExpect(status().isOk())
            .andExpect(jsonPath("nameFacilityCategory").value("Elliptique"))
            .andExpect(jsonPath("quantityFacilityCategory").value(3));
    }
	
	@Test
	@WithMockUser(roles = { "ADMIN" })
	public void addFacilityCategory() throws Exception {
		when(this.facilityCategoryService.saveFacilityCategory(any())).thenReturn(new FacilityCategory("Musculature"));

		this.mockMvc
				.perform(post("/managerctrl/addfacilitycategory/Musculature"))
				.andExpect(status().isOk()).andExpect(jsonPath("nameFacilityCategory").value("Musculature"));
	}
	
}
