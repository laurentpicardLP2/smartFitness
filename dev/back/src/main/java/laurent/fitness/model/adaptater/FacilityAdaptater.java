package laurent.fitness.model.adaptater;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

@Entity
@NamedQuery(name="FacilityAdaptater.findAll", query="SELECT f FROM FacilityAdaptater f")
public class FacilityAdaptater {
	
	@Id
	private int idFacility;
	
	private String nameFacility;
	
	private float priceSeance;
	
	
	
	public FacilityAdaptater() {
		super();
		// TODO Auto-generated constructor stub
	}


	public FacilityAdaptater(String nameFacility, float priceSeance) {
		super();
		this.nameFacility = nameFacility;
		this.priceSeance = priceSeance;
	}


	public FacilityAdaptater(int idFacility, String nameFacility, float priceSeance) {
		super();
		this.idFacility = idFacility;
		this.nameFacility = nameFacility;
		this.priceSeance = priceSeance;
	}


	public int getidFacility() {
		return idFacility;
	}


	public void setidFacility(int idFacility) {
		this.idFacility = idFacility;
	}


	public String getNameFacility() {
		return nameFacility;
	}


	public void setNameFacility(String nameFacility) {
		this.nameFacility = nameFacility;
	}


	public float getPriceSeance() {
		return priceSeance;
	}


	public void setPriceSeance(float priceSeance) {
		this.priceSeance = priceSeance;
	}
	
	
}
