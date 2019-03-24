package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.Room;
import laurent.fitness.repository.FacilityCategoryRepository;
import laurent.fitness.repository.FacilityRepository;
import laurent.fitness.repository.RoomRepository;

@Service
public class FacilityServiceImpl implements FacilityService {
	
	private FacilityRepository facilityRepo;
	private FacilityCategoryRepository facilityCategoryRepo;
	private RoomRepository roomRepo;

    public FacilityServiceImpl(FacilityRepository facilityRepo,
    		FacilityCategoryRepository facilityCategoryRepo,
    		RoomRepository roomRepo) {
    	this.facilityRepo = facilityRepo;
        this.facilityCategoryRepo = facilityCategoryRepo;
        this.roomRepo = roomRepo;
    }

	@Override
	public List<Facility> getAllFacilities() {
		// TODO Auto-generated method stub
		return this.facilityRepo.findAll();
	}

	@Override
	public Facility saveNewFacility(String facilityName, String roomName, String facilityCategoryName) {
		// TODO Auto-generated method stub
		Room room = this.roomRepo.findByRoomName(roomName);
		FacilityCategory facilityCategory = this.facilityCategoryRepo.findByFacilityCategoryName(facilityCategoryName);
		Facility facility = new Facility(facilityName, room, facilityCategory);
		return this.facilityRepo.save(facility);
	}

	@Override
	public void deleteFacility(Facility facility) {
		// TODO Auto-generated method stub
		this.facilityRepo.delete(facility);
	}

	@Override
	public Facility findByFacilityName(String facilityName) {
		// TODO Auto-generated method stub
		return this.facilityRepo.findByFacilityName(facilityName);
	}

	@Override
	public Facility saveFacility(Facility facility) {
		// TODO Auto-generated method stub
		return this.facilityRepo.save(facility);
	}

	@Override
	public Facility updateFacility(String facilityName, String roomName) {
		// TODO Auto-generated method stub
		Facility facilityToUpdate = this.facilityRepo.findByFacilityName(facilityName);
		Room room = this.roomRepo.findByRoomName(roomName);
		facilityToUpdate.setRoom(room);
		return this.facilityRepo.save(facilityToUpdate);
	}

	@Override
	public Facility addFacility(int idFacilityCategory, int idRoom, String nameFacility, String descriptionFacility, String imageFacility) {
		// TODO Auto-generated method stub
		FacilityCategory facilityCategory = this.facilityCategoryRepo.findByIdFacilityCategory(idFacilityCategory);
		Room facilityRoom = this.roomRepo.findByIdRoom(idRoom);
		descriptionFacility = (descriptionFacility.equals("undefined")) ? "" : descriptionFacility;
		imageFacility = (imageFacility.equals("undefined")) ? "" : imageFacility;
		Facility saveNewFacility = new Facility(nameFacility, facilityRoom,facilityCategory, descriptionFacility, imageFacility);
		this.facilityRepo.save(saveNewFacility);
		
		//mise à jour de la quantité(+1) pour la catégorie d'équipement à laquelle appartient la facility
		int nbFacilityCategory = this.facilityRepo.findByFacilityCategoryCount(idFacilityCategory);
		facilityCategory.setQuantityFacilityCategory(nbFacilityCategory);
		this.facilityCategoryRepo.save(facilityCategory);
		
		return saveNewFacility;
	}

}
