package laurent.fitness.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.json.JacksonTester;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import laurent.fitness.model.Evenement;
import laurent.fitness.model.TimestampFacility;
import laurent.fitness.services.TimestampFacilityService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class TimestampFacilityControllerTest {
	@Autowired
	MockMvc mockMvc;
		
	@Autowired
	private ObjectMapper objectMapper;

	JacksonTester<Evenement> evenementJacksonTester;
	
	@MockBean
	TimestampFacilityService timestampFacilityService;

	@Before
	public void setUp() {
		JacksonTester.initFields(this, objectMapper);
	}
		
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void addTimestampFacility() throws Exception {
		TimestampFacility timestampFacility = new TimestampFacility();
		when(this.timestampFacilityService.saveTimestampFacility(timestampFacility)).thenReturn(new TimestampFacility());

		String jsonContent = "";

		this.mockMvc.perform(post("/timestampfacilityctrl/addtimestampfacility/1/Elliptique 1/Elliptique").contentType(MediaType.APPLICATION_JSON_UTF8).content(jsonContent))
				.andExpect(status().isOk());
	}
	
	//Remarque : il n'y a pas besoin dede @Test deleteTimestampFacility car il n'y a jamais de requête directe 
		//depuis le front pour supprimer un timestampFacility
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void deleteTimestampFacility() throws Exception {
		doNothing().when(this.timestampFacilityService).deleteTimestampFacility(1);
		this.mockMvc.perform(delete("/timestampfacilityctrl/deletetimestampfacility/1")).andExpect(status().isOk());
	}
}
