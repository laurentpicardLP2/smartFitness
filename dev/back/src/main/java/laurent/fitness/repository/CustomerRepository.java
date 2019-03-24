package laurent.fitness.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, String> {
	@Query("SELECT c FROM Customer c WHERE c.username LIKE %?1%")
	Customer findByUsername(String username);
}
