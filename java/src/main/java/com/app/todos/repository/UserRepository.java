package com.app.todos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.app.todos.entity.User;

import io.swagger.v3.oas.annotations.servers.Server;

import java.util.List;


@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	List<User> findByUserEmail(String userEmail);
	
}
