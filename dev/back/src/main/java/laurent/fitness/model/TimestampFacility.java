package laurent.fitness.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonBackReference;



/**
 * The persistent class for the TimestampFacility database table.
 * 
 */
@Entity
@NamedQuery(name="TimestampFacility.findAll", query="SELECT t FROM TimestampFacility t")
public class TimestampFacility implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idTimestampFacility;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date dateOfTimestamp;

	//bi-directional many-to-one association to Facility
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="Facility_idFacility")
	@JsonBackReference
	private Facility facility;
	
	//bi-directional many-to-one association to FacilityCategory
	@ManyToOne
	@JoinColumn(name="FacilityCategory_idFacilityCategory")
	@JsonBackReference
	private FacilityCategory facilityCategory;


	//bi-directional many-to-one association to Seance
	@ManyToOne
	@JoinColumn(name="Seance_idSeance")
	@JsonBackReference
	private Seance seance;

	public TimestampFacility() {
	}

    public TimestampFacility(Seance seance, Facility facility, FacilityCategory facilityCategory, Date dateOfTimestamp) {
    	this.seance = seance;
		this.facility = facility;
		this.facilityCategory = facilityCategory;
		this.dateOfTimestamp = dateOfTimestamp;
	}

	public int getIdTimestampFacility() {
		return this.idTimestampFacility;
	}

	public void setIdTimestampFacility(int idTimestampFacility) {
		this.idTimestampFacility = idTimestampFacility;
	}
	
	public Date getDateOfTimestamp() {
		return this.dateOfTimestamp;
	}

	public void setDateOfTimestamp(Date dateOfTimestamp) {
		this.dateOfTimestamp = dateOfTimestamp;
	}

	public Facility getFacility() {
		return this.facility;
	}

	public void setFacility(Facility facility) {
		this.facility = facility;
	}
	
	public FacilityCategory getFacilityCategory() {
		return this.facilityCategory;
	}

	public void setFacilityCategory(FacilityCategory facilityCategory) {
		this.facilityCategory = facilityCategory;
	}


	public Seance getSeance() {
		return this.seance;
	}

	public void setSeance(Seance seance) {
		this.seance = seance;
	}

}