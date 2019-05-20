package laurent.fitness.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Date;

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

import laurent.fitness.model.Command;
import laurent.fitness.model.Evenement;
import laurent.fitness.services.CommandService;
import laurent.fitness.services.CustomerService;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class CommandControllerTest {
	@Autowired
	MockMvc mockMvc;
		
	@Autowired
	private ObjectMapper objectMapper;

	JacksonTester<Evenement> evenementJacksonTester;
	
	@Autowired
	CustomerService customerService;

	@Before
	public void setUp() {
		JacksonTester.initFields(this, objectMapper);
	}


	@MockBean
	CommandService commandService;
	
	
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void addCommand() throws Exception {
		when(this.commandService.saveCommand(any())).thenReturn(new Command(customerService.findByUsername("db_sebastien"), new Date()));

		String jsonContent = "";

		this.mockMvc.perform(post("/commandctrl/addcommand/db_sebastien").contentType(MediaType.APPLICATION_JSON_UTF8).content(jsonContent))
				.andExpect(status().isOk()).andExpect(jsonPath("totalPrice").value(0))
				.andExpect(jsonPath("customer.username").value("db_sebastien"));
	}
	
	@Test
	@WithMockUser(roles={"CUSTOMER"})
	public void deleteCommand() throws Exception {
		doNothing().when(this.commandService).deleteCommand(new Command(customerService.findByUsername("db_sebastien"), new Date()));

		this.mockMvc.perform(delete("/commandctrl/delcommand/1")).andExpect(status().isOk());
	}

}
