package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;


/**
 * The persistent class for the Subscription database table.
 * 
 */
@Entity
@NamedQuery(name="Subscription.findAll", query="SELECT s FROM Subscription s")
public class Subscription extends Item implements Serializable {
	private static final long serialVersionUID = 1L;

	//bi-directional many-to-one association to Customer
	@ManyToOne
	@JoinColumn(name="Customer_Users_username")
	@JsonBackReference
	private Customer customer;

	//bi-directional many-to-one association to SubscriptionCategory
	@ManyToOne
	@JoinColumn(name="SubscriptionCategory_idSubscriptionCategory")
	@JsonBackReference
	private SubscriptionCategory subscriptionCategory;

	public Subscription() {
	}
	
	public Subscription(List<Command> commands) {
		super(commands);
	}
	
	public Subscription(List<Command> commands, String typeItem) {
		super(commands, typeItem);
	}

	public Customer getCustomer() {
		return this.customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public SubscriptionCategory getSubscriptionCategory() {
		return this.subscriptionCategory;
	}

	public void setSubscriptionCategory(SubscriptionCategory subscriptionCategory) {
		this.subscriptionCategory = subscriptionCategory;
	}

}