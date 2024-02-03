package com.app.todos.mapper;

import com.app.todos.dto.TodoDto;
import com.app.todos.entity.Todos;

public class TodoMapper {
	public static TodoDto maptoTodoDto(Todos todo) {
		return new TodoDto(
					todo.getTodoId(),
					todo.getTodoDesc(),
					todo.getTodoCreate(),
					todo.getTodoDone(),
					todo.getTodoStatus()
		);
	}
	
	public static Todos mapToTodos(TodoDto todoDto) {
		return new Todos(
					todoDto.getTodoId(),
					todoDto.getTodoDesc(),
					todoDto.getTodoCreate(),
					todoDto.getTodoDone(),
					todoDto.getTodoStatus()
		);		
	}
}
