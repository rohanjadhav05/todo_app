package com.app.todos.service;

import java.util.List;
import java.util.Map;

import com.app.todos.dto.TodoDto;
import com.app.todos.dto.UserDto;
import com.app.todos.entity.User;

public interface UserService {
	UserDto addUser(UserDto userDto);
	
	String loginUser(UserDto login);
}
