package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Authority;
import laurent.fitness.repository.AuthorityRepository;

@Service
public class AuthorityServiceImpl implements AuthorityService {
	
	private AuthorityRepository authorityRepo;
	
	public AuthorityServiceImpl(AuthorityRepository authorityRepo) {
		this.authorityRepo = authorityRepo;
	}

	@Override
	public List<Authority> getAllAuthorities() {
		return this.authorityRepo.findAll();
	}

	@Override
	public Authority saveAuthority(Authority authority) {
		return this.authorityRepo.save(authority);
	}

	@Override
	public void deleteAuthority(Authority authority) {
		this.authorityRepo.delete(authority);
	}

	@Override
	public Authority findByUsername(String username) {
		return this.authorityRepo.findByUsername(username);
	}

	@Override
	public List<Authority> getAuthoritiesCustomer() {
		return this.authorityRepo.findAllAuthoritiesCustomer();
	}

}
