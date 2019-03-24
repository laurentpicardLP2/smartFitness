package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import laurent.fitness.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, String> {

}
