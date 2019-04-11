package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.MaintenanceOperation;

public interface MaintenanceOperationService {
	public List<MaintenanceOperation> getAllMaintenanceOperations();
	public MaintenanceOperation saveMaintenanceOperation(MaintenanceOperation maintenanceOperation);
	public MaintenanceOperation findItemById(int idMaintenanceOperation);

}
