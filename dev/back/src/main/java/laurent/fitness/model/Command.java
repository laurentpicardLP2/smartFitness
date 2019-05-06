package laurent.fitness.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the Command database table.
 * 
 */
@Entity
@NamedQuery(name="Command.findAll", query="SELECT c FROM Command c")
public class Command implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idCommand;

	@Temporal(TemporalType.TIMESTAMP)
	private Date dateOfCommand;

	private float totalPrice;
	
	private int statusCommand;

	
//bi-directional many-to-one association to Customer
	@ManyToOne
	@JoinColumn(name="Customer_Users_username")
	private Customer customer;

	//bi-directional many-to-many association to Item
	@ManyToMany(mappedBy="commands", cascade=CascadeType.REMOVE)
	private List<Item> items;

	public Command() {
		this.items = new ArrayList<Item>();
	}
	
	public Command(List<Item> items) {
		this.items = items;
	}
	
	public Command(Customer customer) {
		this.customer = customer;
		this.items = new ArrayList<Item>();
	}
	
	public Command(Customer customer, Date dateOfCommand) {
		this.customer = customer;
		this.dateOfCommand = dateOfCommand;
		this.items = new ArrayList<Item>();
	}

	public int getIdCommand() {
		return this.idCommand;
	}

	public void setIdCommand(int idCommand) {
		this.idCommand = idCommand;
	}

	public Date getDateOfCommand() {
		return this.dateOfCommand;
	}

	public void setDateOfCommand(Date dateOfCommand) {
		this.dateOfCommand = dateOfCommand;
	}

	public float getTotalPrice() {
		return this.totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}
	
	public int getStatusCommand() {
		return this.statusCommand;
	}

	public void setStatusCommand(int statusCommand) {
		this.statusCommand = statusCommand;
	}

	public Customer getCustomer() {
		return this.customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public List<Item> getItems() {
		return this.items;
	}

	public void setItems(List<Item> items) {
		this.items = items;
	}

}