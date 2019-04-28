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
	
	@Query(value = "SELECT product_category.* FROM product_category INNER JOIN product_ref ON"
			+ " product_ref.product_category_id_product_category = id_product_category WHERE id_product_ref = ?1", nativeQuery = true)
	ProductCategory findByIdProductCategoryAssociateToProductRef(int idProductRef);

}
