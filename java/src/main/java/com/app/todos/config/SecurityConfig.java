package com.app.todos.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

	@Autowired
	private CustomSuccessHandler successHandler;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//		http.csrf().disable()
//		.authorizeRequests()
//		.requestMatchers("/user/**").permitAll()
//		.anyRequest().authenticated()
//		.and()
//		.formLogin().loginPage("/user/login").successHandler(successHandler)
//		.and().csrf().disable()
//		.oauth2Login().loginPage("/user/login").successHandler(successHandler);
		
		 http.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(auth -> {
					auth.requestMatchers("/user/**","/login/**").permitAll();
					auth.anyRequest().authenticated();
		})
		.oauth2Login()
		.authorizationEndpoint()
		.baseUri("/oauth2/authorize")
		.and()
		.redirectionEndpoint()
		.baseUri("/oauth2/callback/*")
		.and()
		.successHandler(successHandler);
		 
		 return http.build();
		
	}
	
}
