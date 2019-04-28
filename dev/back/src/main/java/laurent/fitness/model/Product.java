package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the Product database table.
 * 
 */
@Entity
@NamedQuery(name="Product.findAll", query="SELECT p FROM Product p")
public class Product extends Item implements Serializable {
	private static final long serialVersionUID = 1L;

	private int quantityProduct;

//	//bi-directional many-to-one association to ProductRef
	@ManyToOne
	@JoinColumn(name="ProductRef_idProductRef")
	private ProductRef productRef;

	public Product() {
	}
	
	public Product(List<Command> commands) {
		super(commands);
	}
	
	public Product(List<Command> commands, String typeItem) {
		super(commands, typeItem);
	}
	
	public Product(List<Command> commands, String typeItem, float price, ProductRef productRef) {
		super(commands, typeItem, price);
		this.productRef = productRef;
	}
	
	public Product(List<Command> commands, String typeItem, float price, int quantityProduct, ProductRef productRef) {
		super(commands, typeItem, price);
		this.quantityProduct = quantityProduct;
		this.productRef = productRef;
	}

	public int getQuantityProduct() {
		return this.quantityProduct;
	}

	public void setQuantityProduct(int quantityProduct) {
		this.quantityProduct = quantityProduct;
	}

	public ProductRef getProductRef() {
		return this.productRef;
	}

	public void setProductRef(ProductRef productRef) {
		this.productRef = productRef;
	}

}