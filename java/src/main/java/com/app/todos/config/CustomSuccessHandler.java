package com.app.todos.config;

import java.io.IOException;
import java.util.List;

import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.app.todos.dto.UserDto;
import com.app.todos.entity.User;
import com.app.todos.repository.UserRepository;
import com.app.todos.service.UserService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

	@Autowired
	public UserRepository userRepo;
	
	@Autowired
	public UserService userService;
	
	@Value("${frontend.url}")
	private String frontendUrl;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		// TODO Auto-generated method stub
		this.setAlwaysUseDefaultTargetUrl(true);
		if(authentication.getPrincipal() instanceof DefaultOAuth2User) {
			System.out.println("Inside the onAuthentication Success : ");
			DefaultOAuth2User userDetails = (DefaultOAuth2User)authentication.getPrincipal();
			System.out.println("User Deaatils  : "+userDetails);
			String userName = userDetails.getAttribute("email") != null ? userDetails.getAttribute("email") : userDetails.getAttribute("login")+"@gmail.com";
			System.out.println("userName : "+userName+" userDetails.getAttribute(\"email\") : "+userDetails.getAttribute("email")+" userDetails.getAttribute(login) : "+userDetails.getAttribute("login")+"@gmail.com");
			System.out.println("userRepo.findByUserEmail(userName) : "+userRepo.findByUserEmail(userName));
			List<User> user = userRepo.findByUserEmail(userName);
			if(user.size() == 0) {
				UserDto userDto = new UserDto();
				userDto.setUserEmail(userName);
				userDto.setUserPass("dummy");
				userService.addUser(userDto);
			}
		}
		this.setDefaultTargetUrl(frontendUrl);
		super.onAuthenticationSuccess(request, response, authentication);
	}

}
