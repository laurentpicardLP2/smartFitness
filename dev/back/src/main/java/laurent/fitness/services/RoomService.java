package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Room;

public interface RoomService {
	public List<Room> getAllRooms();
	
	public Room saveRoom(Room room);
	
	public Room updateRoom(int idRoom, String nameRoom, int capacityRoom);
	
	public void deleteRoom(Room room);
	
	public Room findByRoomName(String roomName);
	
	public Room findByIdRoom(int idRoom);
	
	public Room getRoomAssociateToFacility(int idFacility);
	
	public List<String> getListNameRooms();

}
