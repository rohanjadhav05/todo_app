package com.app.todos.service;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.todos.dto.TodoDto;
import com.app.todos.entity.Todos;
import com.app.todos.entity.User;
import com.app.todos.exception.ResourceNotFoundException;
import com.app.todos.mapper.TodoMapper;
import com.app.todos.repository.UserRepository;
import com.app.todos.repository.todoRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService{

	@Autowired
	private todoRepository todoRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	private TodoMapper todoMapper;

	@Override
	public List<TodoDto> getTodo(Integer id) {
		User user = userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with Id doesn't exist"));
		List<Todos> todoByUserId = todoRepo.findByUser(user);
		List<TodoDto> todoDto = new ArrayList<>();
		for(Todos t : todoByUserId) {
			todoDto.add(todoMapper.maptoTodoDto(t));
		}
		return todoDto;
	}

	@Override
	public List<TodoDto> getAllTodo() {
		List<Todos> allTodos = todoRepo.findAll();
		List<TodoDto> todoDto = new ArrayList<>();
		for(Todos t : allTodos) {
			todoDto.add(todoMapper.maptoTodoDto(t));
		}
		return todoDto;
	}

	@Override
	public TodoDto createTodo(TodoDto todoDto) {
		Date currentDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd HH:mm:ss");
		todoDto.setTodoCreate(dateFormat.format(currentDate));
		todoDto.setTodoStatus("New");
		System.out.println("toDo "+todoDto.toString());
		Todos todo = todoMapper.mapToTodos(todoDto); 
		Todos savedTodo = todoRepo.save(todo);
		return todoMapper.maptoTodoDto(savedTodo);
	}

	@Override
	public TodoDto deleteTodoById(Integer id) {
		Todos deleteTodo = todoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message with Id doesn't not exists : "+id ));
		todoRepo.delete(deleteTodo);
		return todoMapper.maptoTodoDto(deleteTodo);
	}

	@Override
	public Map<String, Object> updateTodo(Integer id, TodoDto todoDto) {
		Todos todo = todoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message with Id doesn't not exists : "+id));
		Date currentDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd HH:mm:ss");
		todo.setTodoDone(dateFormat.format(currentDate));
		todo.setTodoStatus("Done");
		todoRepo.save(todo);
		return Collections.singletonMap("userChanged", 1);
	}

	@Override
	public Map<String, Object> updateToInProgress(Integer id, TodoDto todoDto) {
		Todos todo = todoRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Message with Id doesn't not exists : "+id));
		Date currentDate = new Date();
		SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd HH:mm:ss");
		todo.setTodoStatus("In-Progress");
		todoRepo.save(todo);
		return Collections.singletonMap("userChanged", 1);
	}

}
