package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;


/**
 * The persistent class for the ConnectedWatchCategory database table.
 * 
 */
@Entity
@NamedQuery(name="ConnectedWatchCategory.findAll", query="SELECT c FROM ConnectedWatchCategory c")
public class ConnectedWatchCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idConnectedWatchCategory;

	private String modelWatch;

	private float priceConnectedWatch;

	//bi-directional many-to-one association to ConnectedWatch
	@OneToMany(mappedBy="connectedWatchCategory")
	@JsonBackReference
	private List<ConnectedWatch> connectedWatches;

	public ConnectedWatchCategory() {
	}

	public int getIdConnectedWatchCategory() {
		return this.idConnectedWatchCategory;
	}

	public void setIdConnectedWatchCategory(int idConnectedWatchCategory) {
		this.idConnectedWatchCategory = idConnectedWatchCategory;
	}

	public String getModelWatch() {
		return this.modelWatch;
	}

	public void setModelWatch(String modelWatch) {
		this.modelWatch = modelWatch;
	}

	public float getPriceConnectedWatch() {
		return this.priceConnectedWatch;
	}

	public void setPriceConnectedWatch(float priceConnectedWatch) {
		this.priceConnectedWatch = priceConnectedWatch;
	}

	public List<ConnectedWatch> getConnectedWatches() {
		return this.connectedWatches;
	}

	public void setConnectedWatches(List<ConnectedWatch> connectedWatches) {
		this.connectedWatches = connectedWatches;
	}

	public ConnectedWatch addConnectedWatch(ConnectedWatch connectedWatch) {
		getConnectedWatches().add(connectedWatch);
		connectedWatch.setConnectedWatchCategory(this);

		return connectedWatch;
	}

	public ConnectedWatch removeConnectedWatch(ConnectedWatch connectedWatch) {
		getConnectedWatches().remove(connectedWatch);
		connectedWatch.setConnectedWatchCategory(null);

		return connectedWatch;
	}

}