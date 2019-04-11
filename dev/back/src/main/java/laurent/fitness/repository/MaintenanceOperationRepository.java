package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.MaintenanceOperation;

public interface MaintenanceOperationRepository extends JpaRepository<MaintenanceOperation, Integer> {
	@Query("SELECT m FROM MaintenanceOperation m WHERE m.idMaintenanceOperation = ?1")
	MaintenanceOperation findByIdMaintenanceOperation(int idMaintenanceOperation);
}
