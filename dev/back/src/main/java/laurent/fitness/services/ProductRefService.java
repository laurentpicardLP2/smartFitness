package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.ProductRef;

public interface ProductRefService {
	
	public List<ProductRef> getAllProductRef();
	
	public ProductRef saveProductRef(ProductRef productRef);
	
	public ProductRef saveProductRef(ProductRef productRef, int idProductCategory);
	
	public ProductRef updateProductRef(ProductRef productRef, String nameProductCategory);
	
	public ProductRef updateProductRef(int idProductRef, String nameProductRef, float priceProductRef, String descriptionProductRef,
			String imageProductRef, int idProductCategory);
	
	public void deleteProductRef(ProductRef productRef);
	
	public ProductRef findByIdProductRef(int idProductRef);
	
	public ProductRef findByNameProductRef(String nameProductRef);
	
	public List<String> getListNameProductRef();
	
	public List<ProductRef> getFavoriteProductRefs();
}
