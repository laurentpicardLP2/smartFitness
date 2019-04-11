package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the Facility database table.
 * 
 */
@Entity
@NamedQuery(name="Facility.findAll", query="SELECT f FROM Facility f")
public class Facility implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idFacility;

	@Column(unique = true)
	private String nameFacility;
	
	private float priceSeance;
	
	@Column(columnDefinition="int default 0")
	private float priceFacility;
	
	@Lob
	private String descriptionFacility;
	
	@Temporal(TemporalType.DATE)
	private Date dateOfPurchase;


	private String imageFacility;

	//bi-directional many-to-one association to Room
	@ManyToOne
	@JoinColumn(name="Room_idRoom")
	@JsonBackReference
	private Room room;

	//bi-directional many-to-one association to FacilityCategory
	@ManyToOne
	@JoinColumn(name="FacilityCategory_idFacilityCategory")
	@JsonBackReference
	private FacilityCategory facilityCategory;

	//bi-directional many-to-one association to TimestampFacility
	@OneToMany(mappedBy="facility")
	@JsonManagedReference
	private List<TimestampFacility> timestampFacilities;
	
	
	//bi-directional many-to-many association to Facility
	@JsonManagedReference
	@ManyToMany
	@JoinTable(
		name="Facility_has_MaintenanceOperation"
		, joinColumns={
			@JoinColumn(name="Facility_idFacility")
			}
		, inverseJoinColumns={
			@JoinColumn(name="MaintenanceOperation_idMaintenanceOperation")
			}
		)
	private List<MaintenanceOperation> maintenanceOperations;


	public Facility() {
	}
	
	public Facility(String nameFacility, Room room, FacilityCategory facilityCategory) {
		this.nameFacility = nameFacility;
		this.room = room;
		this.facilityCategory = facilityCategory;
	}
	
	public Facility(String nameFacility, Room room, FacilityCategory facilityCategory, float priceSeance) {
		this.nameFacility = nameFacility;
		this.room = room;
		this.facilityCategory = facilityCategory;
		this.priceSeance = priceSeance;
	}
	
	public Facility(String nameFacility, Room room, FacilityCategory facilityCategory, String descriptionFacility) {
		this.nameFacility = nameFacility;
		this.room = room;
		this.facilityCategory = facilityCategory;
		this.descriptionFacility = descriptionFacility;	
	}

	public Facility(String nameFacility, Room room, FacilityCategory facilityCategory, String descriptionFacility, float priceSeance) {
		this.nameFacility = nameFacility;
		this.room = room;
		this.facilityCategory = facilityCategory;
		this.descriptionFacility = descriptionFacility;
		this.priceSeance = priceSeance;
	}

	
	public Facility(String nameFacility, Room room, FacilityCategory facilityCategory, String descriptionFacility, String imageFacility) {
		this.nameFacility = nameFacility;
		this.room = room;
		this.facilityCategory = facilityCategory;
		this.descriptionFacility = descriptionFacility;
		this.imageFacility = imageFacility;		
	}

	public Facility(String nameFacility, Room room, FacilityCategory facilityCategory, String descriptionFacility, String imageFacility, float priceSeance) {
		this.nameFacility = nameFacility;
		this.room = room;
		this.facilityCategory = facilityCategory;
		this.descriptionFacility = descriptionFacility;
		this.imageFacility = imageFacility;
		this.priceSeance = priceSeance;
	}
	
	public Facility(String nameFacility, Room room, FacilityCategory facilityCategory, String descriptionFacility, String imageFacility, float priceSeance, float priceFacility, Date dateOfPurchase) {
		this.nameFacility = nameFacility;
		this.room = room;
		this.facilityCategory = facilityCategory;
		this.descriptionFacility = descriptionFacility;
		this.imageFacility = imageFacility;
		this.priceSeance = priceSeance;
		this.priceFacility = priceFacility;
		this.dateOfPurchase = dateOfPurchase;
	}
	
	public int getIdFacility() {
		return this.idFacility;
	}

	public void setIdFacility(int idFacility) {
		this.idFacility = idFacility;
	}

	public String getNameFacility() {
		return nameFacility;
	}

	public void setNameFacility(String nameFacility) {
		this.nameFacility = nameFacility;
	}
	
	public float getPriceSeance() {
		return this.priceSeance;
	}

	public void setPriceSeance(float priceSeance) {
		this.priceSeance = priceSeance;
	}
	
	public float getPriceFacility() {
		return this.priceFacility;
	}

	public void setPriceFacility(float priceFacility) {
		this.priceFacility = priceFacility;
	}
	
	public Date getDateOfPurchase() {
		return this.dateOfPurchase;
	}

	public void setDateOfPurchase(Date dateOfPurchase) {
		this.dateOfPurchase = dateOfPurchase;
	}

	public String getDescriptionFacility() {
		return descriptionFacility;
	}

	public void setDescriptionFacility(String descriptionFacility) {
		this.descriptionFacility = descriptionFacility;
	}

	public String getImageFacility() {
		return imageFacility;
	}

	public void setImageFacility(String imageFacility) {
		this.imageFacility = imageFacility;
	}

	public Room getRoom() {
		return this.room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	public FacilityCategory getFacilityCategory() {
		return this.facilityCategory;
	}

	public void setFacilityCategory(FacilityCategory facilityCategory) {
		this.facilityCategory = facilityCategory;
	}
	
	public List<MaintenanceOperation> getMaintenanceOperations() {
		return this.maintenanceOperations;
	}

	public void setMaintenanceOperations(List<MaintenanceOperation> maintenanceOperations) {
		this.maintenanceOperations = maintenanceOperations;
	}

	public List<TimestampFacility> getTimestampFacilities() {
		return this.timestampFacilities;
	}

	public void setTimestampFacilities(List<TimestampFacility> timestampFacilities) {
		this.timestampFacilities = timestampFacilities;
	}

	public TimestampFacility addTimestampFacility(TimestampFacility timestampFacility) {
		getTimestampFacilities().add(timestampFacility);
		timestampFacility.setFacility(this);

		return timestampFacility;
	}

	public TimestampFacility removeTimestampFacility(TimestampFacility timestampFacility) {
		getTimestampFacilities().remove(timestampFacility);
		timestampFacility.setFacility(null);

		return timestampFacility;
	}

}