package com.app.todos.service;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.todos.dto.UserDto;
import com.app.todos.entity.User;
import com.app.todos.exception.ResourceNotFoundException;
import com.app.todos.mapper.TodoMapper;
import com.app.todos.repository.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;

	public static String hashPassword(String plainPass) {
		String salt = BCrypt.gensalt();
		return BCrypt.hashpw(plainPass, salt);
	}
	
	
	@Override
	public UserDto addUser(UserDto userDto) {
		// hash Password and save in database;
		userDto.setUserPass(hashPassword(userDto.getUserPass()));
		User savedUser = userRepo.save(TodoMapper.mapToUser(userDto));
		return TodoMapper.mapToUserDto(savedUser);
	}

	@Override
	public String loginUser(UserDto login) {
		List<User> list = userRepo.findByUserEmail(login.getUserEmail());
		if(list.size() != 0) {
			if(BCrypt.checkpw(login.getUserPass(), list.get(0).getUserPass())) {
				return "Success";
			}
			return "Incorrect Password";
		}
		return "Email does not exists";
	}
	
	
	
	

}
