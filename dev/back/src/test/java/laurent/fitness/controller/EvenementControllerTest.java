package laurent.fitness.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

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
import laurent.fitness.services.EvenementService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class EvenementControllerTest {
	
	@Autowired
	MockMvc mockMvc;
		
	@Autowired
	private ObjectMapper objectMapper;

	JacksonTester<Evenement> evenementJacksonTester;

	@Before
	public void setUp() {
		JacksonTester.initFields(this, objectMapper);
	}


	@MockBean
	EvenementService evenementService;
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getEvenements() throws Exception {
		when(this.evenementService.findAllEvenement()).thenReturn(new ArrayList<>());
		
		this.mockMvc.perform(get("/evenementctrl/getallevenements")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getEvenementsInProgress() throws Exception {
		when(this.evenementService.getEvenementInProgress()).thenReturn(new ArrayList<>());
		
		this.mockMvc.perform(get("/evenementctrl/getevenementinprogress")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getEvenementsInSlotTime() throws Exception {
		when(this.evenementService.getEvenementInSlotTime()).thenReturn(new ArrayList<>());
		
		this.mockMvc.perform(get("/evenementctrl/getevenementinslottime")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void getIdMaxEvenement() throws Exception {
		when(this.evenementService.getIdMaxEvenement()).thenReturn(1);
		
		this.mockMvc.perform(get("/evenementctrl/getidmaxevenement")).andExpect(status().isOk());
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void addEvenement() throws Exception {
		when(this.evenementService.saveEvenement(any())).thenReturn(new Evenement("Cours Fitness"));

		String jsonContent = "{\"titleEvt\": \"Cours Fitness\"}";

		this.mockMvc.perform(post("/evenementctrl/addevenement").contentType(MediaType.APPLICATION_JSON_UTF8).content(jsonContent))
				.andExpect(status().isOk()).andExpect(jsonPath("titleEvt").value("Cours Fitness"));
	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void updateEvenement() throws Exception {
		Evenement evenement = new Evenement("Cours Fitness");

		when(this.evenementService.updateEvenement(any())).thenReturn(evenement);
		
	String jsonContent = evenementJacksonTester.write(evenement).getJson();

		this.mockMvc.perform(put("/evenementctrl/updateevenement").contentType(MediaType.APPLICATION_JSON_UTF8).content(jsonContent))
				.andExpect(status().isOk()).andExpect(jsonPath("titleEvt").value(evenement.getTitleEvt()));

	}
	
	@Test
	@WithMockUser(roles={"ADMIN"})
	public void deleteEvenement() throws Exception {
		doNothing().when(this.evenementService).deleteEvenement(1);

		this.mockMvc.perform(delete("/evenementctrl/delevenement/1")).andExpect(status().isOk());
	}
	
}
