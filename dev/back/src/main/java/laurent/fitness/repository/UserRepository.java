package laurent.fitness.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Customer;
import laurent.fitness.model.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	@Query("SELECT u FROM User u WHERE u.username LIKE %?1%")
	User findByUsername(String username);
		
	@Transactional
	@Modifying
	@Query("DELETE FROM User u WHERE u.username LIKE %?1%")
    void deleteByUsername(String username);
	
	
	//@Query(value = "SELECT MAX(idUser) from User", nativeQuery = true)
	@Query("SELECT u FROM User u WHERE u.idUser in (SELECT MAX(idUser) from User)")
	 public User findByUsernameIdMax();
	
	@Query("SELECT u FROM User u WHERE u.idUser = ?1")
	 public User findByIdUser(int idUser);
}



