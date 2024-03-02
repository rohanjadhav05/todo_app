package com.app.todos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.todos.entity.Todos;
import com.app.todos.entity.User;

import java.util.List;


@Repository
public interface todoRepository extends JpaRepository<Todos, Integer>{
	List<Todos> findByUser(User userId);
}
