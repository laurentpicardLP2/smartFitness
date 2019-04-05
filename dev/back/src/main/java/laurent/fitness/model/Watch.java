package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;


/**
 * The persistent class for the Watch database table.
 * 
 */
@Entity
@NamedQuery(name="Watch.findAll", query="SELECT w FROM Watch w")
public class Watch extends Item implements Serializable {
	private static final long serialVersionUID = 1L;

	//bi-directional many-to-one association to WatchCategory
	@ManyToOne
	@JoinColumn(name="WatchCategory_idWatchCategory")
	@JsonManagedReference
	private WatchCategory watchCategory;
		
	//bi-directional many-to-one association to Customer
	@ManyToOne
	@JoinColumn(name="Customer_Users_username")
	@JsonBackReference
	private Customer customer;

	public Watch() {
	}
	
	public Watch(List<Command> commands) {
		super(commands);
	}
	
	public Watch(List<Command> commands, String typeItem) {
		super(commands, typeItem);
	}
	
	public Watch(List<Command> commands, String typeItem, float price, Customer customer, WatchCategory watchCategory) {
		super(commands, typeItem, price);
		this.customer = customer;
		this.watchCategory = watchCategory;
	}

	public WatchCategory getWatchCategory() {
		return this.watchCategory;
	}

	public void setWatchCategory(WatchCategory watchCategory) {
		this.watchCategory = watchCategory;
	}

	public Customer getCustomer() {
		return this.customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

}