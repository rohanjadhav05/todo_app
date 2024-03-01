package com.app.todos.dto;

import com.app.todos.entity.User;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@ToString
@Getter
public class TodoDto {
	private Integer todoId;
	private String todoDesc;
	private String todoCreate;
	private String todoDone;
	private String todoStatus;
	private int userId;
}
