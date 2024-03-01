package com.app.todos.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TodoDto {
	private Integer todoId;
	private String todoDesc;
	private String todoCreate;
	private String todoDone;
	private String todoStatus;
	private int userId;
}
