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

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the SubscriptionCategory database table.
 * 
 */
@Entity
@NamedQuery(name="SubscriptionCategory.findAll", query="SELECT s FROM SubscriptionCategory s")
public class SubscriptionCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idSubscriptionCategory;

	private int nbLast;
	
	private String typeLast;

	@Column(unique = true)
	private String nameSubscription;

	private float priceSubscription;

	//bi-directional many-to-one association to Subscription
	@OneToMany(mappedBy="subscriptionCategory")
	@JsonIgnore
	private List<Subscription> subscriptions;

	public SubscriptionCategory() {
	}
	
	public SubscriptionCategory(String nameSubscription, int nbLast, String typeLast, float priceSubscription) {
		this.nameSubscription = nameSubscription;
		this.nbLast = nbLast;
		this.typeLast = typeLast;
		this.priceSubscription = priceSubscription;
	}
	
	

	public int getIdSubscriptionCategory() {
		return this.idSubscriptionCategory;
	}

	public void setIdSubscriptionCategory(int idSubscriptionCategory) {
		this.idSubscriptionCategory = idSubscriptionCategory;
	}

	public int getNbLast() {
		return nbLast;
	}

	public void setNbLast(int nbLast) {
		this.nbLast = nbLast;
	}

	public String getTypeLast() {
		return typeLast;
	}

	public void setTypeLast(String typeLast) {
		this.typeLast = typeLast;
	}

	public String getNameSubscription() {
		return nameSubscription;
	}

	public void setNameSubscription(String nameSubscription) {
		this.nameSubscription = nameSubscription;
	}

	public float getPriceSubscription() {
		return priceSubscription;
	}

	public void setPriceSubscription(float priceSubscription) {
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