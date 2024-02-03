package com.app.todos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.todos.entity.Todos;

public interface todoRepository extends JpaRepository<Todos, Integer>{
 
}
