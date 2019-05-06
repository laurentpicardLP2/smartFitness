package laurent.fitness.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String>{
	@Query("SELECT a FROM Authority a WHERE a.username LIKE ?1")
	 public Authority findByUsername(String username);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM Authority a WHERE a.username LIKE ?1")
    void deleteByUsername(String username);
	
	//WHERE authority like 'ROLE_CUSTOMER'
	@Query(value = "SELECT * FROM authorities WHERE authority like '%' ) ", nativeQuery = true)
	public List<Authority> findAllAuthoritiesCustomer ();
}


