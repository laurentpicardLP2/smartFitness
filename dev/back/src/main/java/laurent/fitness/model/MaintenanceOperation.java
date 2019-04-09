package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;
import java.util.List;


/**
 * The persistent class for the MaintenanceOperation database table.
 * 
 */
@Entity
@NamedQuery(name="MaintenanceOperation.findAll", query="SELECT m FROM MaintenanceOperation m")
public class MaintenanceOperation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idMaintenanceOperation;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="DateOfIntervention")
	private Date dateOfIntervention;

	private float costOfIntervention;
	
	@Column(name="DescOfIntervention")
	private String descOfIntervention;

	@Column(name="TypeOfIntervention")
	private String typeOfIntervention;

	//bi-directional many-to-many association to Facility
	@ManyToMany
	@JoinTable(
		name="Facility_has_MaintenanceOperation"
		, joinColumns={
			@JoinColumn(name="MaintenanceOperation_idMaintenanceOperation")
			}
		, inverseJoinColumns={
			@JoinColumn(name="Facility_idFacility")
			}
		)
	private List<Facility> facilities;

	public MaintenanceOperation() {
	}

	public int getIdMaintenanceOperation() {
		return this.idMaintenanceOperation;
	}

	public void setIdMaintenanceOperation(int idMaintenanceOperation) {
		this.idMaintenanceOperation = idMaintenanceOperation;
	}
	

	public Date getDateOfIntervention() {
		return this.dateOfIntervention;
	}

	public void setDateOfIntervention(Date dateOfIntervention) {
		this.dateOfIntervention = dateOfIntervention;
	}
	
	public float getCostOfIntervention() {
		return this.costOfIntervention;
	}

	public void setCostOfIntervention(float costOfIntervention) {
		this.costOfIntervention = costOfIntervention;
	}


	public String getDescOfIntervention() {
		return this.descOfIntervention;
	}

	public void setDescOfIntervention(String descOfIntervention) {
		this.descOfIntervention = descOfIntervention;
	}

	public String getTypeOfIntervention() {
		return this.typeOfIntervention;
	}

	public void setTypeOfIntervention(String typeOfIntervention) {
		this.typeOfIntervention = typeOfIntervention;
	}

	public List<Facility> getFacilities() {
		return this.facilities;
	}

	public void setFacilities(List<Facility> facilities) {
		this.facilities = facilities;
	}

}