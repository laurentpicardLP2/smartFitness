package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;


/**
 * The persistent class for the ConnectedWatch database table.
 * 
 */
@Entity
@NamedQuery(name="ConnectedWatch.findAll", query="SELECT c FROM ConnectedWatch c")
public class ConnectedWatch extends Item implements Serializable {
	private static final long serialVersionUID = 1L;

	//bi-directional many-to-one association to ConnectedWatchCategory
	@ManyToOne
	@JoinColumn(name="ConnectedWatchCategory_idConnectedWatchCategory")
	@JsonManagedReference
	private ConnectedWatchCategory connectedWatchCategory;
		
	//bi-directional many-to-one association to Customer
	@ManyToOne
	@JoinColumn(name="Customer_Users_username")
	@JsonBackReference
	private Customer customer;

	public ConnectedWatch() {
	}
	
	public ConnectedWatch(List<Command> commands) {
		super(commands);
	}
	
	public ConnectedWatch(List<Command> commands, String typeItem) {
		super(commands, typeItem);
	}

	public ConnectedWatchCategory getConnectedWatchCategory() {
		return this.connectedWatchCategory;
	}

	public void setConnectedWatchCategory(ConnectedWatchCategory connectedWatchCategory) {
		this.connectedWatchCategory = connectedWatchCategory;
	}

	public Customer getCustomer() {
		return this.customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

}