package com.app.todos.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class UserDto {
	private Integer userId;
	private String userName;
	private String userEmail; 
	private String userPass; 
}
