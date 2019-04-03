package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.List;


/**
 * The persistent class for the WatchCategory database table.
 * 
 */
@Entity
@NamedQuery(name="WatchCategory.findAll", query="SELECT w FROM WatchCategory w")
public class WatchCategory implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idWatchCategory;

	@Column(unique = true)
	private String nameWatch;

	private float priceWatch;
	
	private String descriptionWatch;

	private String imageWatch;

	//bi-directional many-to-one association to Watch
	@OneToMany(mappedBy="watchCategory")
	@JsonBackReference
	private List<Watch> watches;

	public WatchCategory() {
	}
	
	public WatchCategory(String nameWatch, float priceWatch, String descriptionWatch, String imageWatch) {
		this.nameWatch = nameWatch;
		this.priceWatch = priceWatch;
		this.descriptionWatch = descriptionWatch;
		this.imageWatch = imageWatch;
	}

	public int getIdWatchCategory() {
		return this.idWatchCategory;
	}

	public void setIdWatchCategory(int idWatchCategory) {
		this.idWatchCategory = idWatchCategory;
	}

	public String getNameWatch() {
		return this.nameWatch;
	}

	public void setNameWatch(String nameWatch) {
		this.nameWatch = nameWatch;
	}

	public float getPriceWatch() {
		return this.priceWatch;
	}

	public void setPriceWatch(float priceWatch) {
		this.priceWatch = priceWatch;
	}
	
	public String getDescriptionWatch() {
		return this.descriptionWatch;
	}

	public void setDescriptionWatch(String descriptionWatch) {
		this.descriptionWatch = descriptionWatch;
	}

	public String getImageWatch() {
		return this.imageWatch;
	}

	public void setImageWatch(String imageWatch) {
		this.imageWatch = imageWatch;
	}

	public List<Watch> getWatches() {
		return this.watches;
	}

	public void setWatches(List<Watch> watches) {
		this.watches = watches;
	}

	public Watch addWatch(Watch watch) {
		getWatches().add(watch);
		watch.setWatchCategory(this);

		return watch;
	}

	public Watch removeWatch(Watch watch) {
		getWatches().remove(watch);
		watch.setWatchCategory(null);

		return watch;
	}

}