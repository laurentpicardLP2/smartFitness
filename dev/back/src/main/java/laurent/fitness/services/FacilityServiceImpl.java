package laurent.fitness.services;

import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Facility;
import laurent.fitness.model.FacilityCategory;
import laurent.fitness.model.MaintenanceOperation;
import laurent.fitness.model.Room;
import laurent.fitness.repository.FacilityCategoryRepository;
import laurent.fitness.repository.FacilityRepository;
import laurent.fitness.repository.MaintenanceOperationRepository;
import laurent.fitness.repository.RoomRepository;

@Service
public class FacilityServiceImpl implements FacilityService {
	
	private FacilityRepository facilityRepo;
	private FacilityCategoryRepository facilityCategoryRepo;
	private RoomRepository roomRepo;
	private MaintenanceOperationRepository maintenanceOperationRepo;

    public FacilityServiceImpl(FacilityRepository facilityRepo,
    		FacilityCategoryRepository facilityCategoryRepo,
    		RoomRepository roomRepo,
    		MaintenanceOperationRepository maintenanceOperationRepo) {
    	this.facilityRepo = facilityRepo;
        this.facilityCategoryRepo = facilityCategoryRepo;
        this.roomRepo = roomRepo;
        this.maintenanceOperationRepo = maintenanceOperationRepo;
    }

	@Override
	public List<Facility> getAllFacilities() {
		return this.facilityRepo.findAll();
	}

	@Override
	public Facility saveNewFacility(String facilityName, String roomName, String facilityCategoryName) {
		Room room = this.roomRepo.findByRoomName(roomName);
		FacilityCategory facilityCategory = this.facilityCategoryRepo.findByFacilityCategoryName(facilityCategoryName);
		Facility facility = new Facility(facilityName, room, facilityCategory);
		return this.facilityRepo.save(facility);
	}

	@Override
	public void deleteFacility(Facility facility) {
		this.facilityRepo.delete(facility);
	}

	@Override
	public Facility findByFacilityName(String facilityName) {
		return this.facilityRepo.findByFacilityName(facilityName);
	}

	@Override
	public Facility saveFacility(Facility facility) {
		return this.facilityRepo.save(facility);
	}

	@Override
	public Facility updateFacility(String facilityName, String roomName) {
		Facility facilityToUpdate = this.facilityRepo.findByFacilityName(facilityName);
		Room room = this.roomRepo.findByRoomName(roomName);
		facilityToUpdate.setRoom(room);
		return this.facilityRepo.save(facilityToUpdate);
	}

	@Override
	public Facility addFacility(int idFacilityCategory, int idRoom, String nameFacility, String descriptionFacility, String imageFacility, float priceSeance, float priceFacility, Date dateOfPurchase) {
		FacilityCategory facilityCategory = this.facilityCategoryRepo.findByIdFacilityCategory(idFacilityCategory);
		Room facilityRoom = this.roomRepo.findByIdRoom(idRoom);
		descriptionFacility = (descriptionFacility.equals("undefined")) ? "" : descriptionFacility;
		imageFacility = (imageFacility.equals("undefined")) ? "" : imageFacility;
		Facility saveNewFacility = new Facility(nameFacility, facilityRoom,facilityCategory, descriptionFacility, imageFacility, priceSeance, priceFacility, dateOfPurchase);
		this.facilityRepo.save(saveNewFacility);
		
		//mise à jour de la quantité(+1) pour la catégorie d'équipement à laquelle appartient la facility
		int nbFacilityCategory = this.facilityRepo.findByFacilityCategoryCount(idFacilityCategory);
		facilityCategory.setQuantityFacilityCategory(nbFacilityCategory);
		this.facilityCategoryRepo.save(facilityCategory);
		
		return saveNewFacility;
	}

	@Override
	public Facility updateFacility(int idFacility, String nameFacilityCategory, String nameRoom, String nameFacility, float priceSeance, String descriptionFacility, String imageFacility, float priceFacility) {
		Facility facility = this.facilityRepo.findByIdFacility(idFacility);
		FacilityCategory facilityCategory = this.facilityCategoryRepo.findByFacilityCategoryName(nameFacilityCategory);
		Room room = this.roomRepo.findByRoomName(nameRoom);
		descriptionFacility = (descriptionFacility.equals("undefined")) ? "" : descriptionFacility;
		imageFacility = (imageFacility.equals("undefined")) ? "" : imageFacility;
		facility.setNameFacility(nameFacility);
		facility.setFacilityCategory(facilityCategory);
		facility.setRoom(room);
		facility.setPriceSeance(priceSeance);
		facility.setDescriptionFacility(descriptionFacility);
		facility.setImageFacility(imageFacility);
		facility.setPriceFacility(priceFacility);
		return this.facilityRepo.save(facility);
	}

	@Override
	public Facility addMaintenanceOperationToFacility(int idFacility, MaintenanceOperation operation) {
		Facility facility = this.facilityRepo.findByIdFacility(idFacility);
		this.maintenanceOperationRepo.save(operation);
		List<MaintenanceOperation> maintenanceOperations = facility.getMaintenanceOperations();
		maintenanceOperations.add(operation);
		facility.setMaintenanceOperations(maintenanceOperations);
		return this.facilityRepo.save(facility);
	}

	@Override
	public void deleteMaintenanceOperationFromFacility(int idFacility, int idMaintenanceOperation) {
		MaintenanceOperation maintenanceOperation = this.maintenanceOperationRepo.findByIdMaintenanceOperation(idMaintenanceOperation);
		Facility facility = this.facilityRepo.findByIdFacility(idFacility);
		facility.getMaintenanceOperations().remove(maintenanceOperation);
		this.maintenanceOperationRepo.delete(maintenanceOperation);
		this.facilityRepo.save(facility);
		
	}

	@Override
	public float getRevenueForAFacility(int idFacility) {		// TODO Auto-generated method stub
		return this.facilityRepo.findRevenueByFacility(idFacility);		
	}

	@Override
	public List<String> getListNameFacilities() {
		return this.facilityRepo.findByNameFacilitiesList();
	}

}
