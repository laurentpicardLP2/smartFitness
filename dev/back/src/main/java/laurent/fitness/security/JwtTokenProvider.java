package laurent.fitness.security;

import static laurent.fitness.security.SecurityConstants.SECRET_KEY;
import static laurent.fitness.security.SecurityConstants.TOKEN_EXPIRATION_TIME;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import laurent.fitness.model.AuthToken;
import laurent.fitness.model.User;
import laurent.fitness.services.UserService;


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
    	long validityInMilliseconds = 3600;
    	
	    user = userService.findByUsername(user.getUsername()); // pour récupérer l'id
	    SecurityContextHolder.getContext().setAuthentication(authentication);
	    
	    Date now = new Date(System.currentTimeMillis());
	    Date expireDate = new Date(now.getTime() + TOKEN_EXPIRATION_TIME);
	    Map<String, Object>claims = new HashMap<>();
	    claims.put("id", (Long.toString(user.getIdUser())));
	    claims.put("username", user.getUsername());
	    claims.put("fullname",  user.getFullname());
	    claims.put("authority",  user.getAuthority().getAuthority());

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
        	Logger.getLogger("Signature JWT invalide");
        } catch (MalformedJwtException ex) {
        	Logger.getLogger("token JWT invalide");
        } catch (ExpiredJwtException ex) {
        	Logger.getLogger("Désolé, le token a expiré");
        } catch (UnsupportedJwtException ex){
        	Logger.getLogger("Token JWT non supporté");
           
        } catch (IllegalArgumentException ex) {
        	Logger.getLogger("JWT claims string is empty");
        }
        return false;
    }

    /**
     * Récupération l'id du user depuis et à partir du token
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
    
    public String getAuthorityFroJWT(String token) {
    	Claims claims =Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
         return (String)claims.get("authority");
    }
    
    
}

