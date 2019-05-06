package laurent.fitness.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.NamedQuery;


/**
 * The persistent class for the Staff database table.
 * 
 */
@Entity
@NamedQuery(name="Staff.findAll", query="SELECT s FROM Staff s")
public class Staff extends User implements Serializable {
	private static final long serialVersionUID = 1L;


	public Staff() {
	}
	
	public Staff(int idUser,
			String username, 
			String fullname, 
			String password, 
			String email, 
			String tel,
			Date dateOfRegistration, 
			byte enabled) {
	super(idUser,username, fullname, password, email, tel, dateOfRegistration, enabled);
	this.idUser = idUser;
}

}