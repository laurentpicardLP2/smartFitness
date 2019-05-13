package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.MaintenanceOperation;
import laurent.fitness.repository.MaintenanceOperationRepository;

@Service
public class MaintenanceOperationServiceImpl implements MaintenanceOperationService {
	
	private MaintenanceOperationRepository maintenanceOperationRepo;

    public MaintenanceOperationServiceImpl(MaintenanceOperationRepository maintenanceOperationRepo) {
        this.maintenanceOperationRepo = maintenanceOperationRepo;
    }

	@Override
	public List<MaintenanceOperation> getAllMaintenanceOperations() {
		return this.maintenanceOperationRepo.findAll();
	}

	@Override
	public MaintenanceOperation saveMaintenanceOperation(MaintenanceOperation maintenanceOperation) {
		return this.maintenanceOperationRepo.save(maintenanceOperation);
	}

	@Override
	public MaintenanceOperation findItemById(int idMaintenanceOperation) {
		return maintenanceOperationRepo.findByIdMaintenanceOperation(idMaintenanceOperation);
	}

}
