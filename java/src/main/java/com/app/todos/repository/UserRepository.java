package com.app.todos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.todos.entity.User;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer>{
	List<User> findByUserEmail(String userEmail);
}
