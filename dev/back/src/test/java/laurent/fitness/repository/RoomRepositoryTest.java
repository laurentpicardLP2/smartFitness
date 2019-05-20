package laurent.fitness.repository;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;

import laurent.fitness.model.Room;

@RunWith(SpringRunner.class)
@DataJpaTest
//@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class})
@AutoConfigureTestDatabase(replace=Replace.NONE)
public class RoomRepositoryTest {
	
	@Autowired
	private RoomRepository roomRepo;

	@Autowired
	private TestEntityManager testEntityManager;

	@Test
	@WithMockUser(roles={"ADMIN"})
	public void testFindByNameRoom() {
		Room savedRoom = testEntityManager.persistFlushFind(new Room("Room Repository Test", 50));
		Room roomTest = roomRepo.findByRoomName("Room Repository Test");
		assertThat(roomTest.getNameRoom()).isEqualTo(savedRoom.getNameRoom());
		assertThat(roomTest.getCapacityRoom()).isEqualTo(savedRoom.getCapacityRoom());
	}
}
