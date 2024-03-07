import { useState, useEffect } from 'react';
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

export interface TodoDto{
  todoId : number,
  todoDesc : string,
  todoCreate : string,
  todoDone : string,
  todoStatus : string,
  userId : number
}

export interface UserDto{
  userId : number,
	userName : string,
  userEmail : string,
	userPass : string, 
}

const TodoComponent = () => {
  const [todo, setTodo] = useState([])
  const navigator = useNavigate();

  useEffect(() => {
    getAllTodos();
  }, []);

  function getAllTodos(){
    const id : number = localStorage['userId'];
    getallTodo(id).then((response) => {
      const result = response.data;
      setTodo(result['data']);
    }).catch(error => {
      console.log(error);
    })
    // const response = await fetch(
    //   "http://localhost:8080/todo/"+id, 
    //   {
    //     method : "GET",
    //     redirect : "follow"
    //   }
    // ).then((response) => response);

    // const data = await response.json();
    // console.log(data);
    // setTodo(data);
    
  }

  function inProgressTodo(t : TodoDto){
    const todoStatus = t.todoStatus;
    if(todoStatus == 'Done'){
      toast.error("Status is Already Done");
    }
    else if(todoStatus == 'In-Progress'){
      toast.error("Status is Already In-Progress");
    }else{
      updateToInProgress(t).then(() => {
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

  function doneTodo(t : TodoDto){
    updateTodoService(t).then(() => {
      toast.success("Task done");
      getAllTodos();
    }).catch(err => {
      toast.error("Task Failed");
      console.error(err);
    })
    //navigator(`/update-todo/${todoId}`)
  }

  function deleteTodo(todoId : number){
    deleteTodoService(todoId).then(() => {
      toast.success("Task Deleted Successfully");
      getAllTodos();
    }).catch(err => {
      toast.error("Failed to Delete the Task");
      console.error(err);
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <h2 className='text-center mt-3'>List of Todo</h2>
      <Button variant="contained" onClick={addNewTodo} style={{ marginLeft: 'auto' }}>Add new Todo </Button>
      <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ flexDirection: 'column', height: '75vh' }}>
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
            {todo.map((t : TodoDto) => (
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
                  <Button variant='outlined' startIcon={<CheckCircleOutlinedIcon />} style={{margin:'10px' }} onClick={() => doneTodo(t)} >
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