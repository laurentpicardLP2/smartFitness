package laurent.fitness.model.adaptater;

import java.util.List;

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
	
	public FacilityAvailableAdaptater(String nameFacilityCategory, int quantityAvailable, List<Facility> facilities) {
		super();
		this.nameFacilityCategory = nameFacilityCategory;
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
