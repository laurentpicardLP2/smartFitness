package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.ProductCategory;

public interface ProductCategoryService {
	
	public List<ProductCategory> getAllProductCategories();
	
	public ProductCategory saveProductCategory(ProductCategory productCategory);
	
	public ProductCategory saveProductCategory(String nameProductCategory);
	
	public ProductCategory updateProductCategory(int idProductCategory, String nameProductCategory);
	
	public void deleteProductCategory(ProductCategory productCategory);
	
	public void deleteProductCategory(int idProductCategory);
	
	public ProductCategory findByIdProductCategory(int idProductCategory);
	
	public ProductCategory findByNameProductCategory(String nameProductCategory);
	
	public List<String> getListNameProductCategories();
}
