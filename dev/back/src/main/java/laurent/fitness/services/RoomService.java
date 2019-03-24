package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Room;

public interface RoomService {
	public List<Room> getAllRooms();
	
	public Room saveRoom(Room room);
	
	public void deleteRoom(Room room);
	
	public Room findByRoomName(String roomName);
	
	public Room findByIdRoom(int idRoom);

}
