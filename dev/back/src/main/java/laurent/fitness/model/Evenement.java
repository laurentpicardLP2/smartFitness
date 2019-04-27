package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;


import java.util.Date;


/**
 * The persistent class for the Evenement database table.
 * 
 */
@Entity
@NamedQuery(name="Evenement.findAll", query="SELECT e FROM Evenement e")
public class Evenement implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idEvt;

	private String descriptionEvt;

	@Temporal(TemporalType.TIMESTAMP)
	private Date endDateTimeEvt;

	private String imageEvt;

	@Temporal(TemporalType.TIMESTAMP)
	private Date startDateTimeEvt;

	private String titleEvt;

	private String videoEvt;

	
	public Evenement() {
	}
	
	public Evenement(String titleEvt) {
		this.titleEvt = titleEvt;
	}

	public int getIdEvt() {
		return this.idEvt;
	}

	public void setIdEvt(int idEvt) {
		this.idEvt = idEvt;
	}

	public String getDescriptionEvt() {
		return this.descriptionEvt;
	}

	public void setDescriptionEvt(String descriptionEvt) {
		this.descriptionEvt = descriptionEvt;
	}

	public Date getEndDateTimeEvt() {
		return this.endDateTimeEvt;
	}

	public void setEndDateTimeEvt(Date endDateTimeEvt) {
		this.endDateTimeEvt = endDateTimeEvt;
	}

	public String getImageEvt() {
		return this.imageEvt;
	}

	public void setImageEvt(String imageEvt) {
		this.imageEvt = imageEvt;
	}

	public Date getStartDateTimeEvt() {
		return this.startDateTimeEvt;
	}

	public void setStartDateTimeEvt(Date startDateTimeEvt) {
		this.startDateTimeEvt = startDateTimeEvt;
	}

	public String getTitleEvt() {
		return this.titleEvt;
	}

	public void setTitleEvt(String titleEvt) {
		this.titleEvt = titleEvt;
	}

	public String getVideoEvt() {
		return this.videoEvt;
	}

	public void setVideoEvt(String videoEvt) {
		this.videoEvt = videoEvt;
	}

}