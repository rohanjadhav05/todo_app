package com.app.todos.mapper;

import com.app.todos.dto.TodoDto;
import com.app.todos.dto.UserDto;
import com.app.todos.entity.Todos;
import com.app.todos.entity.User;

public class TodoMapper {
	public static TodoDto maptoTodoDto(Todos todo) {
		return new TodoDto(
					todo.getTodoId(),
					todo.getTodoDesc(),
					todo.getTodoCreate(),
					todo.getTodoDone(),
					todo.getTodoStatus(),
					todo.getUser().getUserId()
		);
	}
	
	public static Todos mapToTodos(TodoDto todoDto) {
		Todos todo = new Todos();
		todo.setTodoId(todoDto.getTodoId());
		todo.setTodoDesc(todoDto.getTodoDesc());
		todo.setTodoCreate(todoDto.getTodoCreate());
		todo.setTodoDone(todoDto.getTodoDone());
		todo.setTodoStatus(todoDto.getTodoStatus());
		todo.setUser();
		return todo;
	}
	
	public static User mapToUser(UserDto userDto) {
		User user = new User();
		user.setUserId(userDto.getUserId());
		user.setUserName(userDto.getUserName());
		user.setUserEmail(userDto.getUserEmail());
		user.setUserPass(userDto.getUserPass());
		return user;
	}
	
	public static UserDto mapToUserDto(User user) {
		return new UserDto(
						user.getUserId(),
						user.getUserName(),
						user.getUserEmail(),
						user.getUserPass()
		);
	}
	
}
