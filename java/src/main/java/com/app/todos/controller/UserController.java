package com.app.todos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.todos.dto.Response;
import com.app.todos.dto.TodoDto;
import com.app.todos.dto.UserDto;
import com.app.todos.service.TodoService;
import com.app.todos.service.UserService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService userService;
	
	
	@PostMapping("/singUp")
	public ResponseEntity<?> signUpUser(@RequestBody UserDto userDto){
		System.out.println("UserDto : "+userDto.toString());
		return Response.success(userService.addUser(userDto));
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> LogInUser(@RequestBody UserDto userDto){
		UserDto user = userService.loginUser(userDto);
		if(user != null) {
			return Response.success(user);
		}
		return Response.error("Login In Failed");
	
	}
	
}
