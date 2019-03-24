package laurent.fitness.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
	@Transactional
	@Modifying
	@Query("DELETE FROM Item i WHERE i.idItem = ?1")
    void deleteByIdItem(int idItem);
}
