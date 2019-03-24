package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;


/**
 * The persistent class for the FacilityCategory database table.
 * 
 */
@Entity
@NamedQuery(name="FacilityCategory.findAll", query="SELECT f FROM FacilityCategory f")
public class FacilityCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idFacilityCategory;

	private String nameFacilityCategory;

	private float priceFacilityCategory;

	private int quantityFacilityCategory;


	//bi-directional many-to-one association to Facility
	@OneToMany(mappedBy="facilityCategory")
	@JsonManagedReference
	private List<Facility> facilities;
	
	//bi-directional many-to-one association to TimestampFacility
	@OneToMany(mappedBy="facilityCategory")
	@JsonManagedReference
	private List<TimestampFacility> timestampFacilities;


	public FacilityCategory() {
	}
	
	public FacilityCategory(String nameFacilityCategory, int quantityFacilityCategory) {
		this.nameFacilityCategory = nameFacilityCategory;
		this.quantityFacilityCategory = quantityFacilityCategory;
	}
	
	public FacilityCategory(String nameFacilityCategory, int quantityFacilityCategory, float priceFacilityCategory) {
		this.nameFacilityCategory = nameFacilityCategory;
		this.quantityFacilityCategory = quantityFacilityCategory;
		this.priceFacilityCategory = priceFacilityCategory;
	}
	
	public int getIdFacilityCategory() {
		return this.idFacilityCategory;
	}

	public void setIdFacilityCategory(int idFacilityCategory) {
		this.idFacilityCategory = idFacilityCategory;
	}

	public String getNameFacilityCategory() {
		return nameFacilityCategory;
	}

	public void setNameFacilityCategory(String nameFacilityCategory) {
		this.nameFacilityCategory = nameFacilityCategory;
	}

	public float getPriceFacilityCategory() {
		return priceFacilityCategory;
	}

	public void setPriceFacilityCategory(float priceFacilityCategory) {
		this.priceFacilityCategory = priceFacilityCategory;
	}

	public int getQuantityFacilityCategory() {
		return quantityFacilityCategory;
	}

	public void setQuantityFacilityCategory(int quantityFacilityCategory) {
		this.quantityFacilityCategory = quantityFacilityCategory;
	}

	@JsonIgnore
	public List<Facility> getFacilities() {
		return this.facilities;
	}

	public void setFacilities(List<Facility> facilities) {
		this.facilities = facilities;
	}

	public Facility addFacility(Facility facility) {
		getFacilities().add(facility);
		facility.setFacilityCategory(this);

		return facility;
	}

	public Facility removeFacility(Facility facility) {
		getFacilities().remove(facility);
		facility.setFacilityCategory(null);

		return facility;
	}
	
	@JsonIgnore
	public List<TimestampFacility> getTimestampFacilities() {
		return this.timestampFacilities;
	}

	public void setTimestampFacilities(List<TimestampFacility> timestampFacilities) {
		this.timestampFacilities = timestampFacilities;
	}

	public TimestampFacility addTimestampFacility(TimestampFacility timestampFacility) {
		getTimestampFacilities().add(timestampFacility);
		timestampFacility.setFacilityCategory(this);

		return timestampFacility;
	}

	public TimestampFacility removeTimestampFacility(TimestampFacility timestampFacility) {
		getTimestampFacilities().remove(timestampFacility);
		timestampFacility.setFacilityCategory(null);

		return timestampFacility;
	}


}