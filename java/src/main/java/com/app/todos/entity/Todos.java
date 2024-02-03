package com.app.todos.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "todos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Todos {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "todo_id")
	private Integer todoId;
	@Column(name = "todo_desc", nullable = false)
	private String todoDesc;
	@Column(name = "todo_create")
	private String todoCreate;
	@Column(name = "todo_done")
	private String todoDone;
	@Column(name = "todo_status")
	private String todoStatus;
}
