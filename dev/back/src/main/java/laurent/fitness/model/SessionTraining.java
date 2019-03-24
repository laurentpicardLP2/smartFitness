package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the SessionTraining database table.
 * 
 */
@Entity
@NamedQuery(name="SessionTraining.findAll", query="SELECT s FROM SessionTraining s")
public class SessionTraining extends Item implements Serializable {
	private static final long serialVersionUID = 1L;

	private int capacityAttendant;

	@Temporal(TemporalType.TIMESTAMP)
	private Date dateTime;
	
	private float priceSessionTraining;

	//bi-directional many-to-one association to Room
	@ManyToOne
	@JoinColumn(name="Room_idRoom")
	@JsonBackReference
	private Room room;

	//bi-directional many-to-one association to Staff
	@ManyToOne
	@JoinColumn(name="Staff_Users_username")
	@JsonBackReference
	private Staff staff;

	//bi-directional many-to-many association to Customer
	@ManyToMany
	@JoinTable(
		name="SessionTraining_has_Customer"
		, joinColumns={
			@JoinColumn(name="SessionTraining_idSessionTraining")
			}
		, inverseJoinColumns={
			@JoinColumn(name="Customer_Users_username")
			}
		)
	@JsonBackReference
	private List<Customer> customers;

	public SessionTraining() {
	}
	
	public SessionTraining(List<Command> commands) {
		super(commands);
	}
	
	public SessionTraining(List<Command> commands, String typeItem) {
		super(commands, typeItem);
	}

	public int getCapacityAttendant() {
		return this.capacityAttendant;
	}

	public void setCapacityAttendant(int capacityAttendant) {
		this.capacityAttendant = capacityAttendant;
	}

	public Date getDateTime() {
		return this.dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}
	
	public float getPriceSessionTraining() {
		return this.priceSessionTraining;
	}

	public void setPriceSessionTraining(float priceSessionTraining) {
		this.priceSessionTraining = priceSessionTraining;
	}

	public Room getRoom() {
		return this.room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}

	public Staff getStaff() {
		return this.staff;
	}

	public void setStaff(Staff staff) {
		this.staff = staff;
	}

	public List<Customer> getCustomers() {
		return this.customers;
	}

	public void setCustomers(List<Customer> customers) {
		this.customers = customers;
	}

}