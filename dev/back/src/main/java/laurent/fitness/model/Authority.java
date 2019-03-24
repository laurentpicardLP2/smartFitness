package laurent.fitness.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * The persistent class for the Authorities database table.
 * 
 */
@Entity
@Table(name="Authorities")
@NamedQuery(name="Authority.findAll", query="SELECT a FROM Authority a")
public class Authority implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private String username;

	private String authority;

	//bi-directional one-to-one association to User
	@OneToOne(mappedBy="authority")
	private User user;

	public Authority() {
	}
	
	public Authority(String username, String authority) {
		this.username = username;
		this.authority = authority;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAuthority() {
		return this.authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}
	
	@JsonIgnore
	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}