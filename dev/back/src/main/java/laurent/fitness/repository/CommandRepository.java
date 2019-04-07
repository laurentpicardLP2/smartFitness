package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import laurent.fitness.model.Command;

public interface CommandRepository extends JpaRepository<Command, Integer> {
	@Query("SELECT c FROM Command c WHERE c.idCommand = ?1")
	Command findByIdCommand(int idCommand);
	
	@Query(value = "SELECT * FROM command WHERE total_price > 0 AND customer_users_username like ?1 ORDER BY date_of_command DESC ", nativeQuery = true)
	List<Command> findCommandsByUsername(String username);
	
	@Query(value = "SELECT * FROM command WHERE status_command = 0 AND customer_users_username like ?1 ", nativeQuery = true)
	List<Command> findCommandsZeroByUsername(String username);
	
	@Query(value = "SELECT count(*) FROM command WHERE status_command = 0 AND customer_users_username like ?1 ", nativeQuery = true)
	int findCountCommandsZeroByUsername(String username);
	
	@Transactional
	@Query(value = "SELECT * FROM db_fitness.command WHERE customer_users_username like ?1 AND (timediff(current_timestamp(), date_of_command) > 1000)", nativeQuery = true)
	List<Command> findCountCommandsZeroSup1000ByUsername(String username);
	
	//ne sert pas => pour se rappeler l'utilité de @Transactional et @Modifying pour des requêtes update ou delete natives
	@Transactional
	@Modifying
    @Query(value = "delete FROM db_fitness.command WHERE customer_users_username like ?1 AND (timediff(current_timestamp(), date_of_command) > 1000)", nativeQuery = true)
	void deleteUser(String username);
	
}
