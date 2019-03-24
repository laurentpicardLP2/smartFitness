package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Command;

public interface CommandRepository extends JpaRepository<Command, Integer> {
	@Query("SELECT c FROM Command c WHERE c.idCommand = ?1")
	Command findByIdCommand(int idCommand);
	
	@Query(value = "SELECT * FROM command WHERE customer_users_username like %?1% ORDER BY date_of_command DESC ", nativeQuery = true)
	List<Command> findCommandsByUsername(String username);
}
