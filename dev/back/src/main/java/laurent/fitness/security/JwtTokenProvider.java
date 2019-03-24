package laurent.fitness.security;

import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import laurent.fitness.model.AuthToken;
import laurent.fitness.model.User;
import laurent.fitness.repository.UserRepository;
import laurent.fitness.services.UserService;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static laurent.fitness.security.SecurityConstants.TOKEN_EXPIRATION_TIME;
import static laurent.fitness.security.SecurityConstants.SECRET_KEY;

@Component
public class JwtTokenProvider {
	
	public static final String TOKEN_PREFIX = "Bearer ";

    
    /**
     * Génaration du token
     * @param authentication
     * @param user
     * @param userService
     * @return
     */
    public AuthToken generateToken(Authentication authentication, User user, UserService userService) {
    	
	    user = userService.findByUsername(user.getUsername()); // pour récupérer l'id
	    SecurityContextHolder.getContext().setAuthentication(authentication);
	    
    	 //User user = (User)authentication.getPrincipal();
	    Date now = new Date(System.currentTimeMillis());
	    Date expireDate = new Date(now.getTime() + TOKEN_EXPIRATION_TIME);
	    Map<String, Object>claims = new HashMap<>();
	    claims.put("id", (Long.toString(user.getIdUser())));
	    claims.put("username", user.getUsername());
	    claims.put("role",  authentication.getAuthorities());
	    String jwt =  TOKEN_PREFIX + Jwts.builder()
	            .setSubject(user.getUsername())
	            .setClaims(claims)
	            .setIssuedAt(now)
	            .setExpiration(expireDate)
	            .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
	            .compact();
	    return new AuthToken(jwt);
    }


    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex){
            System.out.println("Signature JWT invalide !!!");
        } catch (MalformedJwtException ex) {
            System.out.println("token JWT invalide !!!");
        } catch (ExpiredJwtException ex) {
            System.out.println("Désolé, le token a expiré !!!");
        } catch (UnsupportedJwtException ex){
            System.out.println("Token JWT non supporté !!!");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT claims string is empty !!!");
        }
        return false;
    }

    /**
     * Récupération l'id du user depuis apartir du token
     * @param token
     * @return
     */
    public int getUserIdFromJWT(String token){
        Claims claims =Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");
        return Integer.parseInt(id);
    }
    
    public String getUsernameFromJWT(String token){
        Claims claims =Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        return (String)claims.get("username");
        
    }
    
    public List<?> getAuthoritariesFroJWT(String token) {
    	Claims claims =Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        System.out.println("getUsernameFromJWT" + (String)claims.get("username"));
        return (List<?>)claims.get("role");
    }
    
    
}

