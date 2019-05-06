package laurent.fitness.security;


import static laurent.fitness.security.SecurityConstants.HEADER_STRING;
import static laurent.fitness.security.SecurityConstants.TOKEN_PREFIX;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import laurent.fitness.model.User;
import laurent.fitness.services.CustomUserDetailsService;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    
    @Autowired
	AuthenticationManager authenticationManager;

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {

        try{
        	String jwt = getJWTFromRequest(httpServletRequest);
            if(StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                int userId = tokenProvider.getUserIdFromJWT(jwt);
                
                User user = customUserDetailsService.loadUserById(userId);
                               
                Object typeRole = new Object();
                
                List<?> role = tokenProvider.getAuthoritariesFroJWT(jwt);
                for (int i=0; i< role.size();i++) {
                	typeRole = role.get(i).toString();
                }
                
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                		user.getUsername(),
                		user.getPassword()
                );
                
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                
                typeRole = typeRole.toString().split("=")[1];
                typeRole = typeRole.toString().substring(0, typeRole.toString().length() - 1);
                                		
                SimpleGrantedAuthority authority = new SimpleGrantedAuthority(typeRole.toString());
                List<SimpleGrantedAuthority> updatedAuthorities = new ArrayList<SimpleGrantedAuthority>();
                updatedAuthorities.add(authority);


                SecurityContextHolder.getContext().setAuthentication(
                        new UsernamePasswordAuthenticationToken(
                                SecurityContextHolder.getContext().getAuthentication().getPrincipal(),
                                SecurityContextHolder.getContext().getAuthentication().getCredentials(),
                                updatedAuthorities)
                );    	        
            }
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    private String getJWTFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(HEADER_STRING);
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith(TOKEN_PREFIX)) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
}
