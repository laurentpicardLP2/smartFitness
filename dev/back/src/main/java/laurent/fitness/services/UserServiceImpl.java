package laurent.fitness.services;

import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Authority;
import laurent.fitness.model.User;
import laurent.fitness.repository.AuthorityRepository;
import laurent.fitness.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	private UserRepository userRepo;
	
	public UserServiceImpl(UserRepository userRepo) {
		this.userRepo = userRepo;
	}

	@Override
	public List<User> getAllUsers() {
		// TODO Auto-generated method stub
		return this.userRepo.findAll();
	}

	@Override
	public User saveUser(User user) {
		// TODO Auto-generated method stub
		
		return this.saveUser(user);
	}

	@Override
	public void deleteUser(User user) {
		// TODO Auto-generated method stub
		
		try {
			this.userRepo.delete(user);
		}catch (Exception e) {
			System.out.println(e);
		}
	}

	@Override
	public int findByUsernameIdMax() {
		// TODO Auto-generated method stub
		int idUserMax = Integer.valueOf(0); // la gestion de l'auto-increment du champ idUser est manuelle car ce n'est pas une clé primaire
		try {
			idUserMax = this.userRepo.findByUsernameIdMax().getIdUser() + 1; 
		}catch (Exception e) {
			idUserMax = Integer.valueOf(1);
		}
		return idUserMax;
	}

	@Override
	public User findByUsername(String username) {
		// TODO Auto-generated method stub
		return this.userRepo.findByUsername(username);
	}

	@Override
	public Authority getAuthorityForAnUser(String username) {
		// TODO Auto-generated method stub
		User user = this.userRepo.findByUsername(username);
		return user.getAuthority();
	}

}
