package laurent.fitness.security;

import static laurent.fitness.security.SecurityConstants.SIGN_UP_URLS;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private Environment env;

    @Autowired
    private JwtAuthenticationEntryPoint unauthorizedHandler;

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() { return new JwtAuthenticationFilter(); }
    
    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    
	@Bean
	public DataSource dataSource() {
		    final DriverManagerDataSource dataSource = new DriverManagerDataSource();
		    dataSource.setDriverClassName(env.getProperty("spring.datasource.driver-class-name"));
		    dataSource.setUrl(env.getProperty("spring.datasource.url"));
		    dataSource.setUsername(env.getProperty("spring.datasource.username"));
		    dataSource.setPassword(env.getProperty("spring.dasource.password"));
		    return dataSource;
		}

		@Autowired
		public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		    auth.jdbcAuthentication().dataSource(dataSource());
		}
		
    @Override
    protected void configure(HttpSecurity http) throws Exception {
    	
        http.cors().and().csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                
                .httpBasic()
                .and()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/postman/**").permitAll()
                .antMatchers("/userctrl/newcustomer").permitAll()
                .antMatchers("/userctrl/login").permitAll()
                .antMatchers("/userctrl/authorities").permitAll()
                .antMatchers("/userctrl/usernames").permitAll()
                .antMatchers("/emailctrl/signupconfirm/**").permitAll()
                .antMatchers("/userctrl/authority/**").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/emailctrl/payedcommand/**").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/commandctrl/**").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/seancectrl/**").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/facilitycategoryctrl/**").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/userctrl/authority/**").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/offrectrl/**").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/evenementctrl/getevenementinslottime").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/reportingctrl/**").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/evenementctrl/getidmaxevenement").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/evenementctrl/getevenementinprogress").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/evenementctrl/getallevenement").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/evenementctrl/updateevenement").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/evenementctrl/getevenementbyid/**").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/evenementctrl/addevenement").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/evenementctrl/delevenement/**").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/managerctrl/getwatchcategories").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/managerctrl/getfacilitycategories").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/managerctrl/updatefacilitycategory/**").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/managerctrl/addmaintenanceoperationtofacility/**").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/managerctrl/updatefacility/**").hasAnyRole("ADMIN", "MANAGER") 
                .antMatchers("/managerctrl/addfacility/**").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/managerctrl/getsubscriptioncategories").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/managerctrl/upload").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/productcategoryctrl/**").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/productrefctrl/**").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/productctrl/**").hasAnyRole("ADMIN", "MANAGER", "CUSTOMER")
                .antMatchers("/adminctrl/**").hasAnyRole("ADMIN")
               
              
                .antMatchers(SIGN_UP_URLS).permitAll()
                .anyRequest().authenticated();

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
   }

    
    
  
    
   }