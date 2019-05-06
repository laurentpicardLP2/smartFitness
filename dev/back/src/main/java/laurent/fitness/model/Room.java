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

import com.fasterxml.jackson.annotation.JsonManagedReference;


/**
 * The persistent class for the Room database table.
 * 
 */
@Entity
@NamedQuery(name="Room.findAll", query="SELECT r FROM Room r")
public class Room implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idRoom;

	private int capacityRoom;

	@Column(unique = true)
	private String nameRoom;

	//bi-directional many-to-one association to Facility
	@OneToMany(mappedBy="room")
	@JsonManagedReference
	private List<Facility> facilities;

	public Room() {
	}
	
	public Room(String nameRoom, int capacityRoom) {
		this.nameRoom = nameRoom;
		this.capacityRoom = capacityRoom;
	}

	public int getIdRoom() {
		return this.idRoom;
	}

	public void setIdRoom(int idRoom) {
		this.idRoom = idRoom;
	}

	public int getCapacityRoom() {
		return this.capacityRoom;
	}

	public void setCapacityRoom(int capacityRoom) {
		this.capacityRoom = capacityRoom;
	}

	public String getNameRoom() {
		return this.nameRoom;
	}

	public void setNameRoom(String nameRoom) {
		this.nameRoom = nameRoom;
	}

	public List<Facility> getFacilities() {
		return this.facilities;
	}

	public void setFacilities(List<Facility> facilities) {
		this.facilities = facilities;
	}

	public Facility addFacility(Facility facility) {
		getFacilities().add(facility);
		facility.setRoom(this);

		return facility;
	}

	public Facility removeFacility(Facility facility) {
		getFacilities().remove(facility);
		facility.setRoom(null);

		return facility;
	}

}