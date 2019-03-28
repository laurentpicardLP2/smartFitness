package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Authority;
import laurent.fitness.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, String> {
	@Query("SELECT s FROM Staff s WHERE s.username LIKE ?1")
	Staff findByUsername(String username);
	
	@Query(value = "SELECT * FROM db_fitness.staff INNER JOIN users on staff.username=users.username ORDER BY users.fullname ", nativeQuery=true)
	List<Staff> findAllStaff();
}
