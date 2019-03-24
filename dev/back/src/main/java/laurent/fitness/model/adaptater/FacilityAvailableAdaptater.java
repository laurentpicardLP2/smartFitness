package laurent.fitness.model.adaptater;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import laurent.fitness.model.Facility;

public class FacilityAvailableAdaptater {
	private String nameFacilityCategory;
	private float priceFacilityCategory;
	private int quantityAvailable;
	private List<Facility> facilities;
	
	public FacilityAvailableAdaptater() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public FacilityAvailableAdaptater(String nameFacilityCategory, float priceFacilityCategory, int quantityAvailable, List<Facility> facilities) {
		super();
		this.nameFacilityCategory = nameFacilityCategory;
		this.priceFacilityCategory = priceFacilityCategory;
		this.quantityAvailable = quantityAvailable;
		this.facilities = facilities;
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

	public int getQuantityAvailable() {
		return quantityAvailable;
	}
	public void setQuantityAvailable(int quantityAvailable) {
		this.quantityAvailable = quantityAvailable;
	}
	
	public List<Facility> getFacilities() {
		return facilities;
	}
	public void setFacilities(List<Facility> facilities) {
		this.facilities = facilities;
	}
	
	
}
