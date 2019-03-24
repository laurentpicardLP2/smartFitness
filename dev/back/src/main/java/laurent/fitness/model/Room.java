package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;


/**
 * The persistent class for the Room database table.
 * 
 */
@Entity
@NamedQuery(name="Room.findAll", query="SELECT r FROM Room r")
public class Room implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idRoom;

	private int capacity;

	private String nameRoom;

	//bi-directional many-to-one association to Facility
	@OneToMany(mappedBy="room")
	@JsonManagedReference
	private List<Facility> facilities;

	//bi-directional many-to-one association to SessionTraining
	@OneToMany(mappedBy="room")
	@JsonManagedReference
	private List<SessionTraining> sessionTrainings;

	public Room() {
	}
	
	public Room(String nameRoom, int capacity) {
		this.nameRoom = nameRoom;
		this.capacity = capacity;
	}

	public int getIdRoom() {
		return this.idRoom;
	}

	public void setIdRoom(int idRoom) {
		this.idRoom = idRoom;
	}

	public int getCapacity() {
		return this.capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
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

	public List<SessionTraining> getSessionTrainings() {
		return this.sessionTrainings;
	}

	public void setSessionTrainings(List<SessionTraining> sessionTrainings) {
		this.sessionTrainings = sessionTrainings;
	}

	public SessionTraining addSessionTraining(SessionTraining sessionTraining) {
		getSessionTrainings().add(sessionTraining);
		sessionTraining.setRoom(this);

		return sessionTraining;
	}

	public SessionTraining removeSessionTraining(SessionTraining sessionTraining) {
		getSessionTrainings().remove(sessionTraining);
		sessionTraining.setRoom(null);

		return sessionTraining;
	}

}