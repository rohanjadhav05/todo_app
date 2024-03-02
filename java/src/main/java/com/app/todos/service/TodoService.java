package com.app.todos.service;

import java.util.List;
import java.util.Map;

import com.app.todos.dto.TodoDto;

public interface TodoService {
	List<TodoDto> getTodo(Integer id);
	
	List<TodoDto> getAllTodo();
	
	TodoDto createTodo(TodoDto todoDto);
	
	TodoDto deleteTodoById(Integer id);
	
	Map<String, Object> updateTodo(Integer id, TodoDto todoDto);
	
	Map<String, Object> updateToInProgress(Integer id, TodoDto todoDto);
}
