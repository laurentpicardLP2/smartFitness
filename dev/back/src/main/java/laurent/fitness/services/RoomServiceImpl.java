package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Room;
import laurent.fitness.repository.RoomRepository;

@Service
public class RoomServiceImpl implements RoomService {
	
	private RoomRepository roomRepo;

    public RoomServiceImpl(RoomRepository roomRepo) {
        this.roomRepo = roomRepo;
    }

	@Override
	public List<Room> getAllRooms() {
		return this.roomRepo.findAll();
	}

	@Override
	public Room saveRoom(Room room) {
		return this.roomRepo.save(room);
	}

	@Override
	public void deleteRoom(Room room) {
		this.roomRepo.delete(room);
		
	}

	@Override
	public Room findByRoomName(String roomName) {
		return this.roomRepo.findByRoomName(roomName);
	}

	@Override
	public Room findByIdRoom(int idRoom) {
		return this.roomRepo.findByIdRoom(idRoom);
	}

	@Override
	public Room updateRoom(int idRoom, String nameRoom, int capacityRoom) {
		Room room = this.roomRepo.findByIdRoom(idRoom);
		room.setNameRoom(nameRoom);
		room.setCapacityRoom(capacityRoom);
		return this.roomRepo.save(room);
	}

	@Override
	public Room getRoomAssociateToFacility(int idFacility) {
		return this.roomRepo.findByIdRoomAssociateToFacility(idFacility);
	}

	@Override
	public List<String> getListNameRooms() {
		return this.roomRepo.findNameRoomsList();
	}

}
