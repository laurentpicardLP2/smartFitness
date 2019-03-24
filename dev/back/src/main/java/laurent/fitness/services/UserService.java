package laurent.fitness.services;


import java.util.List;

import laurent.fitness.model.Authority;
import laurent.fitness.model.User;

public interface UserService {
	public List<User> getAllUsers();
	
	public User saveUser(User user);
	
	public void deleteUser(User user);
	
	public int findByUsernameIdMax();
	
	public User findByUsername(String username);
	
	public Authority getAuthorityForAnUser(String username);

}
