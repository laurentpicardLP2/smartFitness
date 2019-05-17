package laurent.fitness.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;


/**
 * The persistent class for the FacilityCategory database table.
 * 
 */
@Entity
@NamedQuery(name="FacilityCategory.findAll", query="SELECT f FROM FacilityCategory f")
public class FacilityCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idFacilityCategory;

	@Column(unique = true)
	private String nameFacilityCategory;

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
	
	public FacilityCategory(int idFacilityCategory, String nameFacilityCategory) {
		this.nameFacilityCategory = nameFacilityCategory;
	}
	
	public FacilityCategory(String nameFacilityCategory) {
		this.nameFacilityCategory = nameFacilityCategory;
	}
	
	public FacilityCategory(String nameFacilityCategory, int quantityFacilityCategory) {
		this.nameFacilityCategory = nameFacilityCategory;
		this.quantityFacilityCategory = quantityFacilityCategory;
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