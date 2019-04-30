package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.ProductCategory;
import laurent.fitness.model.ProductRef;
import laurent.fitness.repository.ProductCategoryRepository;
import laurent.fitness.repository.ProductRefRepository;

@Service
public class ProductRefServiceImpl implements ProductRefService {
	
	private ProductRefRepository productRefRepo;
	private ProductCategoryRepository productCategoryRepo;
	
	public ProductRefServiceImpl(ProductRefRepository productRefRepo, ProductCategoryRepository productCategoryRepo) {
		this.productRefRepo = productRefRepo;
		this.productCategoryRepo = productCategoryRepo;
	}

	@Override
	public List<ProductRef> getAllProductRef() {
		// TODO Auto-generated method stub
		return this.productRefRepo.findAll();
	}

	@Override
	public ProductRef saveProductRef(ProductRef productRef) {
		// TODO Auto-generated method stub
		return this.productRefRepo.save(productRef);
	}

	@Override
	public ProductRef saveProductRef(ProductRef productRef, int idProductCategory) {
		// TODO Auto-generated method stub 
		ProductCategory productCategory = this.productCategoryRepo.findByIdProductCategory(idProductCategory);
		return this.productRefRepo.save(new ProductRef(productRef.getNameProductRef(), productRef.getPriceProductRef(), productRef.getDescriptionProductRef(), productRef.getImageProductRef(), productCategory));
	}

	@Override
	public ProductRef updateProductRef(int idProductRef, String nameProductRef, float priceProductRef,
			String descriptionProductRef, String imageProductRef, int idProductCategory) {
		// TODO Auto-generated method stub
		ProductCategory productCategory = this.productCategoryRepo.findByIdProductCategory(idProductCategory);
		ProductRef productRef = this.productRefRepo.findByIdProductRef(idProductRef);
		productRef.setNameProductRef(nameProductRef);
		productRef.setPriceProductRef(priceProductRef);
		productRef.setDescriptionProductRef(descriptionProductRef);
		productRef.setImageProductRef(imageProductRef);
		productRef.setProductCategory(productCategory);
		return this.productRefRepo.save(productRef);
	}

	@Override
	public void deleteProductRef(ProductRef productRef) {
		// TODO Auto-generated method stub
		this.productRefRepo.delete(productRef);
	}

	@Override
	public ProductRef findByIdProductRef(int idProductRef) {
		// TODO Auto-generated method stub
		return this.productRefRepo.findByIdProductRef(idProductRef);
	}

	@Override
	public ProductRef findByNameProductRef(String nameProductRef) {
		// TODO Auto-generated method stub
		return this.productRefRepo.findByNameProductRef(nameProductRef);
	}

	@Override
	public List<String> getListNameProductRef() {
		// TODO Auto-generated method stub
		return this.productRefRepo.findByNameProductRefList();
	}

	@Override
	public ProductRef updateProductRef(ProductRef productRef, String nameProductCategory) {
		// TODO Auto-generated method stub
		ProductCategory productCategory = this.productCategoryRepo.findByNameProductCategory(nameProductCategory);
		productRef.setProductCategory(productCategory);
		return this.productRefRepo.save(productRef);
	}
	
	@Override
	public List<ProductRef> getFavoriteProductRefs() {
		// TODO Auto-generated method stub
		return this.productRefRepo.findByFavoriteProductRef();
	}


}
