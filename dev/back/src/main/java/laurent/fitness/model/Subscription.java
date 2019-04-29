package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
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
	@JsonIgnore
	private Customer customer;
	
	@Temporal(TemporalType.DATE)
	private Date dateEndOfSubscription;

	@Temporal(TemporalType.DATE)
	private Date dateStartOfSubscription;

	//bi-directional many-to-one association to SubscriptionCategory
	@ManyToOne
	@JoinColumn(name="SubscriptionCategory_idSubscriptionCategory")
	@JsonIgnore
	private SubscriptionCategory subscriptionCategory;

	public Subscription() {
	}
	
	public Subscription(List<Command> commands) {
		super(commands);
	}
	
	public Subscription(List<Command> commands, int quantityItem) {
		super(commands, quantityItem);
	}
	
	
	public Subscription (List<Command> commands, String typeItem, Customer customer, float price,
			SubscriptionCategory subscriptionCategory, Date dateStartOfSubscription, Date dateEndOfSubscription) {
		super(commands, typeItem, price);
		this.customer = customer;
		this.subscriptionCategory = subscriptionCategory;
		this.dateStartOfSubscription = dateStartOfSubscription;
		this.dateEndOfSubscription = dateEndOfSubscription;
	}
	
	public Subscription (List<Command> commands, String typeItem, Customer customer, float price,
			SubscriptionCategory subscriptionCategory, Date dateStartOfSubscription, Date dateEndOfSubscription , int quantityItem) {
		super(commands, typeItem, price, quantityItem);
		this.customer = customer;
		this.subscriptionCategory = subscriptionCategory;
		this.dateStartOfSubscription = dateStartOfSubscription;
		this.dateEndOfSubscription = dateEndOfSubscription;
	}
	
	public Date getDateEndOfSubscription() {
		return this.dateEndOfSubscription;
	}

	public void setDateEndOfSubscription(Date dateEndOfSubscription) {
		this.dateEndOfSubscription = dateEndOfSubscription;
	}

	public Date getDateStartOfSubscription() {
		return this.dateStartOfSubscription;
	}

	public void setDateStartOfSubscription(Date dateStartOfSubscription) {
		this.dateStartOfSubscription = dateStartOfSubscription;
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