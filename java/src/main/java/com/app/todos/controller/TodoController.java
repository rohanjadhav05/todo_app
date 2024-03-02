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

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/todo")
@CrossOrigin("*")
public class TodoController {

	@Autowired
	private TodoService todoService;
	
	@GetMapping("{userId}")
	public ResponseEntity<?> getTodoById(@PathVariable ("userId") int userId){
		return Response.success(todoService.getTodo(userId));
	}
	
	@PostMapping
	public ResponseEntity<?> creatTodo(@RequestBody TodoDto todoDto){
		return Response.success(todoService.createTodo(todoDto));
	}
	
//	@GetMapping
//	public ResponseEntity<?> getAllTodos(){
//		return Response.success(todoService.getAllTodo());
//	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<?> deleteTodoById(@PathVariable("id") Integer id){
		return Response.success(todoService.deleteTodoById(id));
	}
	
	@PutMapping
	public ResponseEntity<?> updateTodo(@RequestBody TodoDto todoDto){
		return Response.success(todoService.updateTodo(todoDto.getTodoId(), todoDto));
	}
	
	@PutMapping("/inProgress")
	public ResponseEntity<?> updateToInProgress(@RequestBody TodoDto todoDto){
		return Response.success(todoService.updateToInProgress(todoDto.getTodoId(), todoDto));
	}
	
}
