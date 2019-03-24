package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Date;
import java.util.List;


/**
 * The persistent class for the Staff database table.
 * 
 */
@Entity
@NamedQuery(name="Staff.findAll", query="SELECT s FROM Staff s")
public class Staff extends User implements Serializable {
	private static final long serialVersionUID = 1L;

	private String dayWorking;

	private String hourWorking;

	//bi-directional many-to-one association to SessionTraining
	@OneToMany(mappedBy="staff")
	@JsonManagedReference
	private List<SessionTraining> sessionTrainings;


	public Staff() {
	}
	
	public Staff(int idUser,
			String username, 
			String fullname, 
			String password, 
			String email, 
			String tel,
			Date dateOfRegistration, 
			byte enabled,
			String dayWorking,
			String hourWorking) {
	super(idUser,username, fullname, password, email, tel, dateOfRegistration, enabled);
	this.idUser = idUser;
	this.dayWorking = dayWorking;
	this.hourWorking = hourWorking;
}


	public String getDayWorking() {
		return this.dayWorking;
	}

	public void setDayWorking(String dayWorking) {
		this.dayWorking = dayWorking;
	}

	public String getHourWorking() {
		return this.hourWorking;
	}

	public void setHourWorking(String hourWorking) {
		this.hourWorking = hourWorking;
	}

	public List<SessionTraining> getSessionTrainings() {
		return this.sessionTrainings;
	}

	public void setSessionTrainings(List<SessionTraining> sessionTrainings) {
		this.sessionTrainings = sessionTrainings;
	}

	public SessionTraining addSessionTraining(SessionTraining sessionTraining) {
		getSessionTrainings().add(sessionTraining);
		sessionTraining.setStaff(this);

		return sessionTraining;
	}

	public SessionTraining removeSessionTraining(SessionTraining sessionTraining) {
		getSessionTrainings().remove(sessionTraining);
		sessionTraining.setStaff(null);

		return sessionTraining;
	}

}