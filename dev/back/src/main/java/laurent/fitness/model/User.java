package laurent.fitness.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


/**
 * The persistent class for the Users database table.
 * 
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="Users")
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
public class User implements Serializable, UserDetails {
	private static final long serialVersionUID = 1L;
	

	@Id
	@Column(unique=true)
	@NotBlank(message = "Login ne doit pas être vide")
	protected String username;
	
	@Column(unique=true)
	protected int idUser;

	protected String fullname;

	protected String password;
	
	protected String email;

	protected String tel;
	
	@Temporal(TemporalType.DATE)
	protected Date dateOfRegistration;
	
	protected byte enabled;

	//bi-directional one-to-one association to Authority
	@OneToOne(cascade=CascadeType.REMOVE)
	@JoinColumn(name="username")
	protected Authority authority;

	public User() {
	}
	
	public User(String username,String password) {
		this.username = username;
		this.password = password;
	}
	
	public User(int idUser, String username, String fullname, String password, String email, String tel, Date dateOfRegistration, byte enabled) {
		this.idUser = idUser;
		this.username = username;
		this.fullname = fullname;
		this.password = password;
		this.email = email;
		this.tel = tel;
		this.dateOfRegistration = dateOfRegistration;
		this.enabled = enabled;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public void setEmail(String email) {
		this.email = email;
	}

	public byte getEnabled() {
		return this.enabled;
	}

	public void setEnabled(byte enabled) {
		this.enabled = enabled;
	}

	public String getFullname() {
		return this.fullname;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public int getIdUser() {
		return this.idUser;
	}

	public void setIdUser(int idUser) {
		this.idUser = idUser;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTel() {
		return this.tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Authority getAuthority() {
		return this.authority;
	}

	public void setAuthority(Authority authority) {
		this.authority = authority;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}




}