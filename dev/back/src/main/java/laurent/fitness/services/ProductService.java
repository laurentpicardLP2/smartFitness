package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Product;
import laurent.fitness.model.ProductRef;

public interface ProductService {
	public List<ProductRef> getAllProductRef();
	public Product addProduct(int idCommand, int idProductRef, int quantityItem);
}
