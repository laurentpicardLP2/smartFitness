package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.ProductCategory;
import laurent.fitness.repository.ProductCategoryRepository;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService {
	
	private ProductCategoryRepository productCategoryRepo;
	
	public ProductCategoryServiceImpl(ProductCategoryRepository productCategoryRepo) {
		this.productCategoryRepo = productCategoryRepo;
	}

	@Override
	public List<ProductCategory> getAllProductCategories() {
		return this.productCategoryRepo.findAll();
	}

	@Override
	public ProductCategory saveProductCategory(ProductCategory productCategory) {
		return this.productCategoryRepo.save(productCategory);
	}

	@Override
	public ProductCategory saveProductCategory(String nameProductCategory) {
		return this.productCategoryRepo.save(new ProductCategory(nameProductCategory));
	}

	@Override
	public ProductCategory updateProductCategory(int idProductCategory, String nameProductCategory) {
		ProductCategory productCategory = this.productCategoryRepo.findByIdProductCategory(idProductCategory);
		productCategory.setNameProductCategory(nameProductCategory);
		this.productCategoryRepo.save(productCategory);
		return null;
	}

	@Override
	public void deleteProductCategory(ProductCategory productCategory) {
		this.productCategoryRepo.delete(productCategory);
	}

	@Override
	public void deleteProductCategory(int idProductCategory) {
		this.productCategoryRepo.delete(this.productCategoryRepo.findByIdProductCategory(idProductCategory));
	}

	@Override
	public ProductCategory findByIdProductCategory(int idProductCategory) {
		return this.productCategoryRepo.findByIdProductCategory(idProductCategory);
	}

	@Override
	public ProductCategory findByNameProductCategory(String nameProductCategory) {
		return this.productCategoryRepo.findByNameProductCategory(nameProductCategory);
	}

	@Override
	public List<String> getListNameProductCategories() {
		return this.productCategoryRepo.findByNameProductCategoriesList();
	}

	@Override
	public ProductCategory getProductCategoryAssociateToProductRef(int idProductRef) {
		return this.productCategoryRepo.findByIdProductCategoryAssociateToProductRef(idProductRef);
	}

}
