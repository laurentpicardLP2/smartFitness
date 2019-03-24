package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Room;

public interface RoomRepository extends JpaRepository<Room, Integer> {
	@Query("SELECT r FROM Room r WHERE r.nameRoom LIKE %?1%")
	Room findByRoomName(String roomName);
	
	@Query("SELECT r FROM Room r WHERE r.idRoom = ?1")
	Room findByIdRoom(int idRoom);
}
