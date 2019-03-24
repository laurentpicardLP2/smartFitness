package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.List;


/**
 * The persistent class for the SubscriptionCategory database table.
 * 
 */
@Entity
@NamedQuery(name="SubscriptionCategory.findAll", query="SELECT s FROM SubscriptionCategory s")
public class SubscriptionCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idSubscriptionCategory;

	private String lastSubscription;

	private String nameSubscription;

	private String priceSubscription;

	//bi-directional many-to-one association to Subscription
	@OneToMany(mappedBy="subscriptionCategory")
	@JsonManagedReference
	private List<Subscription> subscriptions;

	public SubscriptionCategory() {
	}

	public int getIdSubscriptionCategory() {
		return this.idSubscriptionCategory;
	}

	public void setIdSubscriptionCategory(int idSubscriptionCategory) {
		this.idSubscriptionCategory = idSubscriptionCategory;
	}

	public String getLastSubscription() {
		return lastSubscription;
	}

	public void setLastSubscription(String lastSubscription) {
		this.lastSubscription = lastSubscription;
	}

	public String getNameSubscription() {
		return nameSubscription;
	}

	public void setNameSubscription(String nameSubscription) {
		this.nameSubscription = nameSubscription;
	}

	public String getPriceSubscription() {
		return priceSubscription;
	}

	public void setPriceSubscription(String priceSubscription) {
		this.priceSubscription = priceSubscription;
	}

	public List<Subscription> getSubscriptions() {
		return this.subscriptions;
	}

	public void setSubscriptions(List<Subscription> subscriptions) {
		this.subscriptions = subscriptions;
	}

	public Subscription addSubscription(Subscription subscription) {
		getSubscriptions().add(subscription);
		subscription.setSubscriptionCategory(this);

		return subscription;
	}

	public Subscription removeSubscription(Subscription subscription) {
		getSubscriptions().remove(subscription);
		subscription.setSubscriptionCategory(null);

		return subscription;
	}

}