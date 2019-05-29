package laurent.fitness.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import laurent.fitness.model.Authority;
import laurent.fitness.model.User;
import laurent.fitness.repository.SubscriptionRepository;
import laurent.fitness.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	private UserRepository userRepo;
	private SubscriptionRepository subscriptionRepo;
	
	public UserServiceImpl(UserRepository userRepo, SubscriptionRepository subscriptionRepo) {
		this.userRepo = userRepo;
		this.subscriptionRepo = subscriptionRepo;
	}

	@Override
	public List<User> getAllUsers() {
		return this.userRepo.findAll();
	}

	@Override
	public User saveUser(User user) {
		return this.saveUser(user);
	}

	@Override
	public void deleteUser(User user) {
		try {
			this.userRepo.delete(user);
		}catch (Exception e) {
			System.out.println(e);
		}
	}

	@Override
	public int findByUsernameIdMax() {
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
		return this.userRepo.findByUsername(username);
	}

	@Override
	public Authority getAuthorityForAnUser(String username) {
		User user = this.userRepo.findByUsername(username);
		return user.getAuthority();
	}

	@Override
	public String getEmailByUsername(String username) {
		return this.userRepo.findEmailByUsername(username);
	}

	@Override
	public String getFullnameByUsername(String username) {
		return this.userRepo.findFullnameByUsername(username);
	}

	@Override
	public List<String> getListUsername() {
		return this.userRepo.findUsernameList();
	}

	@Override
	public List<String> getUserInfos(String username) {
		User user = this.userRepo.findByUsername(username);
		List<String> infos = new ArrayList<>();
		infos.add(user.getFullname());
		infos.add(user.getEmail());
		return infos;
	}

	@Override
	public boolean findIsSubscribedSelectedDateByUsername(String username, String selectedDate) {
		return this.subscriptionRepo.findIsSubscribedSelectedDateByUsername(username, selectedDate) > 0;
	}
	
}
