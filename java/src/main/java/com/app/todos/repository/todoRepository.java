package com.app.todos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.todos.entity.Todos;

@Repository
public interface todoRepository extends JpaRepository<Todos, Integer>{
 
}
