import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { updateToInProgress, getallTodo, updateTodoService, deleteTodoService } from '../service/TodoService';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { toast } from 'react-toastify'

const TodoComponent = () => {
  const [todo, setTodo] = useState([])
  const navigator = useNavigate();

  useEffect(() => {
    getAllTodos();
  }, []);

  function getAllTodos() {
    getallTodo().then((response) => {
      const result = response.data;
      setTodo(result['data']);
    }).catch(error => {
      console.log(error);
    })
  }

  function inProgressTodo(t){
    const todoId = t.todoId;
    const todoStatus = t.todoStatus;
    const todoCreate = t.todoCreate;
    const todoDone = t.todoDone;
    const todoDesc = t.todoDesc;
    const todo = {todoId, todoDesc, todoCreate, todoStatus, todoDone};
    if(todoStatus == 'Done'){
      toast.error("Status is Already Done");
    }
    else if(todoStatus == 'In-Progress'){
      toast.error("Status is Already In-Progress");
    }else{
      updateToInProgress(todo).then((response) => {
        toast.warning("Changed to In-Progress");
        getAllTodos();
      }).catch(err => {
        console.error(err);
      })
    }
  }

  function addNewTodo(){
    navigator("/add-todo")
  }

  function doneTodo(todoId){
    const todo = {todoId};
    updateTodoService(todo).then((response) => {
      toast.success("Task done");
      getAllTodos();
    }).catch(err => {
      toast.error("Task Failed");
    })
    //navigator(`/update-todo/${todoId}`)
  }

  function deleteTodo(todoId){
    deleteTodoService(todoId).then((response) => {
      toast.success("Task Deleted Successfully");
      getAllTodos();
    }).catch(err => {
      toast.error("Failed to Delete the Task");
    })
  }

  return (
    <div style={{ alignContent: "center" }}>
      <h2 className='text-center mt-3' style={{paddingLeft : '40%' }}>List of Todo</h2>
      <Button variant="contained" onClick={addNewTodo}>Add new Todo</Button>
      <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Create Time</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Done Time</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todo.map((t) => (
              <TableRow
                key={t.todoId}
              >
                <TableCell align="center">{t.todoId}</TableCell>
                <TableCell align="center">{t.todoDesc}</TableCell>
                <TableCell align="center">{t.todoCreate}</TableCell>
                <TableCell align="center">{t.todoStatus}</TableCell>
                <TableCell align="center">{t.todoDone}</TableCell>
                <TableCell align="center">
                 <Button variant="outlined" startIcon={<NotStartedOutlinedIcon />}  style={{margin:'10px' }} onClick={() => inProgressTodo(t)}>
                      In-Progress
                  </Button>
                  <Button variant='outlined' startIcon={<CheckCircleOutlinedIcon />} style={{margin:'10px' }} onClick={() => doneTodo(t.todoId)} >
                      Done
                  </Button>
                  <Button variant='outlined' startIcon={<DeleteOutlineOutlinedIcon />} onClick={() => deleteTodo(t.todoId)} >
                      Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TodoComponent