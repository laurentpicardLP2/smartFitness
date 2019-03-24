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
		// TODO Auto-generated method stub
		return this.roomRepo.findAll();
	}

	@Override
	public Room saveRoom(Room room) {
		// TODO Auto-generated method stub
		return this.roomRepo.save(room);
	}

	@Override
	public void deleteRoom(Room room) {
		// TODO Auto-generated method stub
		this.roomRepo.delete(room);
		
	}

	@Override
	public Room findByRoomName(String roomName) {
		// TODO Auto-generated method stub
		return this.roomRepo.findByRoomName(roomName);
	}

	@Override
	public Room findByIdRoom(int idRoom) {
		// TODO Auto-generated method stub
		return this.roomRepo.findByIdRoom(idRoom);
	}

}
