package com.app.todos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
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
	@Email(message = "Please enter a valid Email")
	private String userEmail;
	@NotBlank(message = "Please enter Password")
	private String userPass; 
}
