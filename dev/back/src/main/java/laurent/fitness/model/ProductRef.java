package laurent.fitness.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;


/**
 * The persistent class for the ProductRef database table.
 * 
 */
@Entity
@NamedQuery(name="ProductRef.findAll", query="SELECT p FROM ProductRef p")
public class ProductRef implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idProductRef;

	private String descriptionProductRef;

	private String imageProductRef;

	private String nameProductRef;

	private float priceProductRef;

	//bi-directional many-to-one association to Product
	@OneToMany(mappedBy="productRef")
	@JsonBackReference
	private List<Product> products;

	//bi-directional many-to-one association to ProductCategory
	@ManyToOne
	@JoinColumn(name="ProductCategory_idProductCategory")
	@JsonBackReference
	private ProductCategory productCategory;

	public ProductRef() {
	}
	
	public ProductRef(String nameProductRef, float priceProductRef, String descriptionProductRef, String imageProductRef) {
		this.nameProductRef = nameProductRef;
		this.priceProductRef = priceProductRef;
		this.descriptionProductRef = (descriptionProductRef.equals("undefined")) ? "" : descriptionProductRef;
		this.imageProductRef = (imageProductRef.equals("undefined")) ? "" : imageProductRef;
	}

	
	public ProductRef(String nameProductRef, float priceProductRef, String descriptionProductRef, String imageProductRef, ProductCategory productCategory) {
		this.nameProductRef = nameProductRef;
		this.priceProductRef = priceProductRef;
		this.descriptionProductRef = (descriptionProductRef.equals("undefined")) ? "" : descriptionProductRef;
		this.imageProductRef = (imageProductRef.equals("undefined")) ? "" : imageProductRef;
		this.productCategory = productCategory;
	}

	public int getIdProductRef() {
		return this.idProductRef;
	}

	public void setIdProductRef(int idProductRef) {
		this.idProductRef = idProductRef;
	}

	public String getDescriptionProductRef() {
		return this.descriptionProductRef;
	}

	public void setDescriptionProductRef(String descriptionProductRef) {
		this.descriptionProductRef = descriptionProductRef;
	}

	public String getImageProductRef() {
		return this.imageProductRef;
	}

	public void setImageProductRef(String imageProductRef) {
		this.imageProductRef = imageProductRef;
	}

	public String getNameProductRef() {
		return this.nameProductRef;
	}

	public void setNameProductRef(String nameProductRef) {
		this.nameProductRef = nameProductRef;
	}

	public float getPriceProductRef() {
		return this.priceProductRef;
	}

	public void setPriceProductRef(float priceProductRef) {
		this.priceProductRef = priceProductRef;
	}

	public List<Product> getProducts() {
		return this.products;
	}

	public void setProducts(List<Product> products) {
		this.products = products;
	}

	public Product addProduct(Product product) {
		getProducts().add(product);
		product.setProductRef(this);

		return product;
	}

	public Product removeProduct(Product product) {
		getProducts().remove(product);
		product.setProductRef(null);

		return product;
	}

	public ProductCategory getProductCategory() {
		return this.productCategory;
	}

	public void setProductCategory(ProductCategory productCategory) {
		this.productCategory = productCategory;
	}

}