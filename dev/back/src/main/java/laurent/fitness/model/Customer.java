package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the Customer database table.
 * 
 */
@Entity
@NamedQuery(name="Customer.findAll", query="SELECT c FROM Customer c")
public class Customer extends User implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Temporal(TemporalType.DATE)
	private Date dateOfBirthday;
	
	private String domesticAddress;

	private String domesticCp;
	
	private String domesticCity;
	
	private String domesticCountry;

	private String deliveryAddress;
	
	private String deliveryCp;

	private String deliveryCity;

	private String deliveryCountry;
	
	//bi-directional many-to-one association to Seance
	@JsonIgnore
	@OneToMany(mappedBy="customer")
	private List<Seance> seances;
		
	//bi-directional many-to-one association to ConnectedWatch
	@OneToMany(mappedBy="customer")
	@JsonIgnore
	private List<ConnectedWatch> connectedWatches;

	//bi-directional many-to-many association to SessionTraining
	@ManyToMany(mappedBy="customers")
	@JsonIgnore
	private List<SessionTraining> sessionTrainings;

	//bi-directional many-to-one association to Subscription
	@OneToMany(mappedBy="customer")
	@JsonIgnore
	private List<Subscription> subscriptions;
	
	public Customer() {
	}
	
	public Customer(int idUser,
					String username, 
					String fullname, 
					String password, 
					String email, 
					String tel,
					Date dateOfRegistration, 
					byte enabled,
					Date dateOfBirthday,
					String domesticAddress,
					String domesticCp,
					String domesticCity,
					String domesticCountry,
					String deliveryAddress,
					String deliveryCp,
					String deliveryCity,
					String deliveryCountry) {
		super(idUser,username, fullname, password, email, tel, dateOfRegistration, enabled);
		this.dateOfBirthday = dateOfBirthday;
		this.domesticAddress = domesticAddress;
		this.domesticCp = domesticCp;
		this.domesticCity = domesticCity;
		this.domesticCountry = domesticCountry;
		this.deliveryAddress = deliveryAddress;
		this.deliveryCp = deliveryCp;
		this.deliveryCity = deliveryCity;
		this.deliveryCountry = deliveryCountry;
	}
	
	public String getUsername() {
		return this.username;
	}

	public Date getDateOfRegistration() {
		return this.dateOfRegistration;
	}

	public void setDateOfRegistration(Date dateOfRegistration) {
		this.dateOfRegistration = dateOfRegistration;
	}

	public String getEmail() {
		return this.email;
	}

	public byte getEnabled() {
		return this.enabled;
	}

	public String getFullname() {
		return this.fullname;
	}

	public int getIdUser() {
		return this.idUser;
	}

	public String getPassword() {
		return this.password;
	}

	public String getTel() {
		return this.tel;
	}

	public Date getDateOfBirthday() {
		return this.dateOfBirthday;
	}

	public void setDateOfBirthday(Date dateOfBirthday) {
		this.dateOfBirthday = dateOfBirthday;
	}

	public String getDeliveryAddress() {
		return this.deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getDeliveryCity() {
		return this.deliveryCity;
	}

	public void setDeliveryCity(String deliveryCity) {
		this.deliveryCity = deliveryCity;
	}

	public String getDeliveryCountry() {
		return this.deliveryCountry;
	}

	public void setDeliveryCountry(String deliveryCountry) {
		this.deliveryCountry = deliveryCountry;
	}

	public String getDeliveryCp() {
		return this.deliveryCp;
	}

	public void setDeliveryCp(String deliveryCp) {
		this.deliveryCp = deliveryCp;
	}

	public String getDomesticAddress() {
		return this.domesticAddress;
	}

	public void setDomesticAddress(String domesticAddress) {
		this.domesticAddress = domesticAddress;
	}

	public String getDomesticCity() {
		return this.domesticCity;
	}

	public void setDomesticCity(String domesticCity) {
		this.domesticCity = domesticCity;
	}

	public String getDomesticCountry() {
		return this.domesticCountry;
	}

	public void setDomesticCountry(String domesticCountry) {
		this.domesticCountry = domesticCountry;
	}

	public String getDomesticCp() {
		return this.domesticCp;
	}

	public void setDomesticCp(String domesticCp) {
		this.domesticCp = domesticCp;
	}

	public List<ConnectedWatch> getConnectedWatches() {
		return this.connectedWatches;
	}

	public void setConnectedWatches(List<ConnectedWatch> connectedWatches) {
		this.connectedWatches = connectedWatches;
	}

	public ConnectedWatch addConnectedWatch(ConnectedWatch connectedWatch) {
		getConnectedWatches().add(connectedWatch);
		connectedWatch.setCustomer(this);

		return connectedWatch;
	}

	public ConnectedWatch removeConnectedWatch(ConnectedWatch connectedWatch) {
		getConnectedWatches().remove(connectedWatch);
		connectedWatch.setCustomer(null);

		return connectedWatch;
	}
	
	public List<Seance> getSeances() {
		return this.seances;
	}

	public void setSeances(List<Seance> seances) {
		this.seances = seances;
	}

	public Seance addSeance(Seance seance) {
		getSeances().add(seance);
		seance.setCustomer(this);

		return seance;
	}

	public Seance removeSeance(Seance seance) {
		getSeances().remove(seance);
		seance.setCustomer(null);

		return seance;
	}
	
	public List<SessionTraining> getSessionTrainings() {
		return this.sessionTrainings;
	}

	public void setSessionTrainings(List<SessionTraining> sessionTrainings) {
		this.sessionTrainings = sessionTrainings;
	}

	public List<Subscription> getSubscriptions() {
		return this.subscriptions;
	}

	public void setSubscriptions(List<Subscription> subscriptions) {
		this.subscriptions = subscriptions;
	}

	public Subscription addSubscription(Subscription subscription) {
		getSubscriptions().add(subscription);
		subscription.setCustomer(this);

		return subscription;
	}

	public Subscription removeSubscription(Subscription subscription) {
		getSubscriptions().remove(subscription);
		subscription.setCustomer(null);

		return subscription;
	}
}