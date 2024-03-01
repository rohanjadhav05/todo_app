package com.app.todos.mapper;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.todos.dto.TodoDto;
import com.app.todos.dto.UserDto;
import com.app.todos.entity.Todos;
import com.app.todos.entity.User;
import com.app.todos.exception.ResourceNotFoundException;
import com.app.todos.repository.UserRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class TodoMapper {
	
	@Autowired
	private UserRepository userRepo;
	
	public TodoDto maptoTodoDto(Todos todo) {
		TodoDto todoDto = new TodoDto();
		todoDto.setTodoId(todo.getTodoId());
		todoDto.setTodoCreate(todo.getTodoCreate());
		todoDto.setTodoDesc(todo.getTodoDesc());
		todoDto.setTodoDone(todo.getTodoDone());
		todoDto.setTodoStatus(todo.getTodoStatus());
		todoDto.setUserId(todo.getUser().getUserId());
		return todoDto;
	}
	
	public Todos mapToTodos(TodoDto todoDto) {
		System.out.println("TodoDto : "+todoDto.toString());
		Todos todo = new Todos();
		todo.setTodoId(todoDto.getTodoId());
		todo.setTodoDesc(todoDto.getTodoDesc());
		todo.setTodoCreate(todoDto.getTodoCreate());
		todo.setTodoDone(todoDto.getTodoDone());
		todo.setTodoStatus(todoDto.getTodoStatus());
		User user = userRepo.findById(todoDto.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User Not Found"));
		todo.setUser(user);
		return todo;
	}
	
	public User mapToUser(UserDto userDto) {
		User user = new User();
		user.setUserId(userDto.getUserId());
		user.setUserName(userDto.getUserName());
		user.setUserEmail(userDto.getUserEmail());
		user.setUserPass(userDto.getUserPass());
		return user;
	}
	
	public UserDto mapToUserDto(User user) {
		return new UserDto(
						user.getUserId(),
						user.getUserName(),
						user.getUserEmail(),
						user.getUserPass()
		);
	}
	
}
