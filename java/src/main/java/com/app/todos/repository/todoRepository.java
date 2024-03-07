package com.app.todos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.todos.entity.Todos;
import com.app.todos.entity.User;


@Repository
public interface todoRepository extends JpaRepository<Todos, Integer>{
	List<Todos> findByUser(User userId);
}
