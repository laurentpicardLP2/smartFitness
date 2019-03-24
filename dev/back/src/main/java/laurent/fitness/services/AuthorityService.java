package laurent.fitness.services;

import java.util.List;

import laurent.fitness.model.Authority;

public interface AuthorityService {
public List<Authority> getAllAuthorities();
	
	public Authority saveAuthority(Authority authority);
	
	public Authority findByUsername(String username);
	
	public void deleteAuthority(Authority authority); 
	
	public List<Authority >getAuthoritiesCustomer();
}
