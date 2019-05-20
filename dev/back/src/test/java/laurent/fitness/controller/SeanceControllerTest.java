package laurent.fitness.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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
import laurent.fitness.model.Seance;
import laurent.fitness.services.CustomerService;
import laurent.fitness.services.ItemService;
import laurent.fitness.services.SeanceService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class SeanceControllerTest {
	@Autowired
	MockMvc mockMvc;
		
	@Autowired
	private ObjectMapper objectMapper;

	JacksonTester<Evenement> evenementJacksonTester;
	
	@MockBean
	CustomerService customerService;

	@Before
	public void setUp() {
		JacksonTester.initFields(this, objectMapper);
	}
	
	@MockBean
	SeanceService seanceService;


	@MockBean
	ItemService itemService;
	
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void addSeance() throws Exception {
		when(this.seanceService.addSeance(5, "db_sebastien", 0f)).thenReturn(new Seance());

		String jsonContent = "";

		this.mockMvc.perform(post("/seancectrl/addseance/5/db_sebastien").contentType(MediaType.APPLICATION_JSON_UTF8).content(jsonContent))
				.andExpect(status().isOk()).andExpect(jsonPath("nbTimestamp").value(0));
	}
	
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void deleteSeance() throws Exception {
		doNothing().when(this.itemService).deleteItem(1);
		this.mockMvc.perform(delete("/seancectrl/deleteseance/1")).andExpect(status().isOk());
	}

}
