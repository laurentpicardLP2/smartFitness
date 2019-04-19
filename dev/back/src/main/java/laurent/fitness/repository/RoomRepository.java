package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import laurent.fitness.model.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
	@Query("SELECT r FROM Room r WHERE r.nameRoom LIKE ?1")
	Room findByRoomName(String nameRoom);
	
	@Query("SELECT r FROM Room r WHERE r.idRoom = ?1")
	Room findByIdRoom(int idRoom);
	
	@Query(value = "SELECT room.* FROM room INNER JOIN facility ON"
			+ " room.id_room = facility.room_id_room WHERE id_facility = ?1", nativeQuery = true)
	Room findByIdRoomAssociateToFacility(int idFacility);
	
	@Query("SELECT r.nameRoom FROM Room r")
	List<String> findNameRoomsList();
}
