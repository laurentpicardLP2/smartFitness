package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.ProductRef;

public interface ProductRefRepository extends JpaRepository<ProductRef, Integer> {
	@Query("SELECT pr FROM ProductRef pr WHERE pr.nameProductRef LIKE ?1")
	ProductRef findByNameProductRef(String nameProductRef);
	
	@Query("SELECT pr FROM ProductRef pr WHERE pr.idProductRef = ?1")
	ProductRef findByIdProductRef(int idProductRef);
	
	@Query("SELECT pr.nameProductRef FROM ProductRef pr")
	List<String> findByNameProductRefList();

}
