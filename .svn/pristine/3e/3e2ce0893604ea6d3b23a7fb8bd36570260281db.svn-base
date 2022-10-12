package kr.co.enitt.poscoWebSystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;


@Configuration
@EnableWebSecurity(debug = false)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter  {
	
    @Override
    protected void configure(HttpSecurity http) throws Exception {
	
    	http.headers().frameOptions().deny();
        http.authorizeRequests().antMatchers("/login","/actionLogin","/logout","/resources/**","/error","/api/**","/").permitAll();
    	 http.httpBasic().disable();
    	 http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).disable();
    }

}