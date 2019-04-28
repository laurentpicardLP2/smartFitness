package laurent.fitness.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import laurent.fitness.model.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {
	@Query("SELECT pc FROM ProductCategory pc WHERE pc.nameProductCategory LIKE ?1")
	ProductCategory findByNameProductCategory(String nameProductCategory);
	
	@Query("SELECT pc FROM ProductCategory pc WHERE pc.idProductCategory = ?1")
	ProductCategory findByIdProductCategory(int idProductCategory);
	
	@Query("SELECT pc.nameProductCategory FROM ProductCategory pc")
	List<String> findByNameProductCategoriesList();

}
