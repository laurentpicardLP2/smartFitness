package laurent.fitness.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonManagedReference;


/**
 * The persistent class for the ProductCategory database table.
 * 
 */
@Entity
@NamedQuery(name="ProductCategory.findAll", query="SELECT p FROM ProductCategory p")
public class ProductCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idProductCategory;

	private String nameProductCategory;

	//bi-directional many-to-one association to ProductRef
	@OneToMany(mappedBy="productCategory", cascade=CascadeType.REMOVE)
	@JsonManagedReference
	private List<ProductRef> productRefs;

	public ProductCategory() {
	}
	
	public ProductCategory(String nameProductCategory) {
		this.nameProductCategory = nameProductCategory;
	}

	public int getIdProductCategory() {
		return this.idProductCategory;
	}

	public void setIdProductCategory(int idProductCategory) {
		this.idProductCategory = idProductCategory;
	}

	public String getNameProductCategory() {
		return this.nameProductCategory;
	}

	public void setNameProductCategory(String nameProductCategory) {
		this.nameProductCategory = nameProductCategory;
	}

	public List<ProductRef> getProductRefs() {
		return this.productRefs;
	}

	public void setProductRefs(List<ProductRef> productRefs) {
		this.productRefs = productRefs;
	}

	public ProductRef addProductRef(ProductRef productRef) {
		getProductRefs().add(productRef);
		productRef.setProductCategory(this);

		return productRef;
	}

	public ProductRef removeProductRef(ProductRef productRef) {
		getProductRefs().remove(productRef);
		productRef.setProductCategory(null);

		return productRef;
	}

}