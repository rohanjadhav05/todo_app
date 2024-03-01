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
		Todos todo = new Todos();
		todo.setTodoId(todoDto.getTodoId());
		todo.setTodoDesc(todoDto.getTodoDesc());
		todo.setTodoCreate(todoDto.getTodoCreate());
		todo.setTodoDone(todoDto.getTodoDone());
		todo.setTodoStatus(todoDto.getTodoStatus());
		return todo;
	}
}
