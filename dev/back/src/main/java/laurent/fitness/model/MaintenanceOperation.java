package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Date;


/**
 * The persistent class for the MaintenanceOperation database table.
 * 
 */
@Entity
@NamedQuery(name="MaintenanceOperation.findAll", query="SELECT m FROM MaintenanceOperation m")
public class MaintenanceOperation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int idMaintenanceOperation;

	private float cost;

	@Temporal(TemporalType.TIMESTAMP)
	private Date dateOfIntervention;

	//bi-directional many-to-one association to Facility
	@ManyToOne
	@JoinColumn(name="Facility_idFacility")
	@JsonBackReference
	private Facility facility;

	public MaintenanceOperation() {
	}

	public int getIdMaintenanceOperation() {
		return this.idMaintenanceOperation;
	}

	public void setIdMaintenanceOperation(int idMaintenanceOperation) {
		this.idMaintenanceOperation = idMaintenanceOperation;
	}

	public float getCost() {
		return this.cost;
	}

	public void setCost(float cost) {
		this.cost = cost;
	}

	public Date getDateOfIntervention() {
		return this.dateOfIntervention;
	}

	public void setDateOfIntervention(Date dateOfIntervention) {
		this.dateOfIntervention = dateOfIntervention;
	}

	public Facility getFacility() {
		return this.facility;
	}

	public void setFacility(Facility facility) {
		this.facility = facility;
	}

}