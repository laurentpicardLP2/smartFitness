package laurent.fitness.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import laurent.fitness.model.User;
import laurent.fitness.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null)
            new UsernameNotFoundException("Utilisateur introuvable !!!");
        return user;
    }

    @Transactional
    public User loadUserById(int idUser){
        User user = userRepository.findByIdUser(idUser);
        if(user == null)
            new UsernameNotFoundException("Utilisateur introuvable !!!");
        return user;
    }
}
