package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Staff;

public interface StaffRepository extends JpaRepository<Staff, String> {
	@Query("SELECT s FROM Staff s WHERE s.username LIKE ?1")
	Staff findByUsername(String username);
}
