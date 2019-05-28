package laurent.fitness.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;


/**
 * The persistent class for the Product database table.
 * 
 */
@Entity
@NamedQuery(name="Product.findAll", query="SELECT p FROM Product p")
public class Product extends Item implements Serializable {
	private static final long serialVersionUID = 1L;

//	//bi-directional many-to-one association to ProductRef
	@ManyToOne
	@JoinColumn(name="ProductRef_idProductRef")
	private ProductRef productRef;

	public Product() {
	}
	
	public Product(List<Command> commands) {
		super(commands);
	}
	
	public Product(List<Command> commands, int quantityItem) {
		super(commands, quantityItem);
	}
	
	public Product(List<Command> commands, String typeItem) {
		super(commands, typeItem);
	}
	
	public Product(List<Command> commands, String typeItem, int quantityItem) {
		super(commands, typeItem, quantityItem);
	}
	
	public Product(List<Command> commands, String typeItem, float price, ProductRef productRef) {
		super(commands, typeItem, price);
		this.productRef = productRef;
	}
	
	public Product(List<Command> commands, String typeItem, float price, int quantityItem) {
		super(commands, typeItem, price, quantityItem);
	}
	
	public Product(List<Command> commands, String typeItem, float price, ProductRef productRef, int quantityItem) {
		super(commands, typeItem, price, quantityItem);
		this.productRef = productRef;
	}
	
	
	public ProductRef getProductRef() {
		return this.productRef;
	}

	public void setProductRef(ProductRef productRef) {
		this.productRef = productRef;
	}

}