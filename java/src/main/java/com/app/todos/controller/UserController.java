package com.app.todos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.todos.dto.Response;
import com.app.todos.dto.UserDto;
import com.app.todos.repository.UserRepository;
import com.app.todos.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	public UserRepository userRepo;
	
	
	@PostMapping("/singUp")
	public ResponseEntity<?> signUpUser(@Valid @RequestBody UserDto userDto, BindingResult result){
		System.out.println("UserDto : "+userDto.toString());
		System.out.println("Result : "+result.toString());
		if(result.hasErrors()) {
			String str = "";
			for(FieldError error : result.getFieldErrors()) {
				str += error.getDefaultMessage()+"\n";
			}
			return ResponseEntity.badRequest().body(str);
		}
		return Response.success(userService.addUser(userDto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> LogInUser(@Valid @RequestBody UserDto userDto, BindingResult result){
		System.out.println("Result : "+result.toString());
		
		if(result.hasErrors()) {
			String str = "";
			for(FieldError error : result.getFieldErrors()) {
				str += error.getDefaultMessage()+"\n";
			}
			return ResponseEntity.badRequest().body(str);
		}
		UserDto user = userService.loginUser(userDto);
		if(user != null) {
			return Response.success(user);
		}
		return Response.error("Login In Failed");
	
	}
	
	
	
}
