import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { createTodo } from '../service/TodoService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function AddTodo() {

  const [todoDesc, setTodoDesc] = useState('');
  const navigator = useNavigate();
  const {todoId} = useParams();   

  function saveTodo(e){
    e.preventDefault();
    const todo = {todoId, todoDesc};
    if(todoDesc.length == 0){
      toast.error("Please add the Description");
    }
    else
    {
      createTodo(todo).then((response) => {
        console.log(response.data);
        toast.success("Todo Added Successfully")
        navigator("/");
      }).catch(err => {
        toast.error("Failed")
        console.error(err);
      })
    }  
  }

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
          id="outlined-basic" 
          label="Enter desc" 
          variant="outlined" 
          type='text' 
          value={todoDesc}
          onChange={(e)=>{
            setTodoDesc(e.target.value);
          }}
          >Todo Desc</TextField>
      <Button variant="contained" onClick={saveTodo}>Add</Button>
    </Box>
  );
}