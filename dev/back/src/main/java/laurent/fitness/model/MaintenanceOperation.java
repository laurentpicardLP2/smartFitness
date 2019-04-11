package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

	@Column(columnDefinition="Decimal(10,2) default '0.00'")
	private float costOfIntervention;

	@Temporal(TemporalType.DATE)
	private Date dateOfIntervention;

	@Column(name="DescOfIntervention")
	private String descOfIntervention;

	private String typeOfIntervention;
	
	@JsonIgnore
	@ManyToMany(mappedBy="maintenanceOperations")
	private List<Facility> facilities;

	public MaintenanceOperation() {
	}

	public int getIdMaintenanceOperation() {
		return this.idMaintenanceOperation;
	}

	public void setIdMaintenanceOperation(int idMaintenanceOperation) {
		this.idMaintenanceOperation = idMaintenanceOperation;
	}

	public float getCostOfIntervention() {
		return this.costOfIntervention;
	}

	public void setCostOfIntervention(float costOfIntervention) {
		this.costOfIntervention = costOfIntervention;
	}

	public Date getDateOfIntervention() {
		return this.dateOfIntervention;
	}

	public void setDateOfIntervention(Date dateOfIntervention) {
		this.dateOfIntervention = dateOfIntervention;
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